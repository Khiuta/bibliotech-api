import Book from "../../models/Management/Book";
import Rating from "../../models/Management/Rating";

import fs from 'fs';

import excel from 'node-xlsx';

import multer from 'multer';
import multerConfig from '../../config/multer';

const upload = multer(multerConfig).single('acervo');

class BookController {
  async bulkStore(req, res){
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const obj = excel.parse(`uploads/files/${filename}`);

        function getAllBooks(data){
          const books = [];
          let qtt = 1;
          for(let i = 0; i < data.length; i++){
            try {
              if(data[i][0] === data[i+1][0]){
                qtt++;
              } else {
                const book = {
                  title: data[i][0],
                  author: data[i][1],
                  release_year: data[i][3],
                  edition: data[i][4],
                  editor: data[i][5],
                  quantity: qtt,
                  available: qtt,
                }

                books.push(book)
                qtt = 1;
              }
            } catch (error) {
              const book = {
                title: data[i][0],
                author: data[i][1],
                release_year: data[i][3],
                edition: data[i][4],
                editor: data[i][5],
                quantity: qtt,
                available: qtt,
              }

              books.push(book)
              qtt = 1;
            }
          }

          return books;
        }

        const allBooks = getAllBooks(obj[0].data.slice(1, undefined));

        const newCollection = await Book.bulkCreate(allBooks);

        fs.unlink(`uploads/files/${filename}`, (err) => {
          if (err) {
            // Handle specific error if any
            if (err.code === 'ENOENT') {
              console.error('File does not exist.');
            } else {
              throw err;
            }
          } else {
            console.log('File deleted!');
          }
        });

        return res.json(newCollection);
      } catch (e) {
        return console.log(e);
      }
    });
  }

  async store(req, res){
    const {
      title, author, edition, editor, release_year, quantity
    } = req.body;



    try {
      const googleBooksApiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`;
      const response = await axios.get(googleBooksApiUrl);
      let book = response.data.items;
      book = book.filter(book => book.volumeInfo.authors.includes(author))

      if(!book){
        return res.status(404).json('Livro não encontrado.')
      }

      let imageUrl = book[0].volumeInfo.imageLinks.thumbnail;
      imageUrl = imageUrl.replace('zoom=1', 'zoom=0');

      const imageResponse = await axios({
        url: imageUrl,
        responseType: 'arraybuffer'
      });

      const buffer = Buffer.from(imageResponse.data, 'binary');

      const resizedImageBuffer = await sharp(buffer)
          .resize({ width: 400, height: 800, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 100, progressive: true }) // Defina o tamanho desejado aqui
          .toBuffer();

      const imagePath = path.join('./', '/uploads', '/images', `${book[0].id}.jpg`);
      fs.writeFileSync(imagePath, resizedImageBuffer);

      const newBook = await Book.create({ title, author, edition, editor, release_year, quantity, image_path: imagePath })

      return res.status(200).json(newBook)
    } catch (error) {
      return res.json(error)
    }
  }

  async index(req, res){
    try {
      const books = await Book.findAll({
        order: [
          ['id', 'ASC']
        ]
      })

      return res.status(200).json(books)
    } catch (error) {
      return res.json(error)
    }
  }

  async show(req, res){
    try {
      const { id } = req.params;

      let book = await Book.findOne({
        where: {
          id,
        },
        attributes: [
          'id', 'title', 'author', 'available', 'rating'
        ],
        include: [
          Rating,
        ]
      })

      const ratings = Object.keys(book.Ratings).length;
      let rating_calc = 0
      for (let i = 0; i < ratings; i++) {
        rating_calc += book.Ratings[i].dataValues.star_rating
      }
      rating_calc /= ratings;
      rating_calc = rating_calc.toFixed(1);

      await Book.update({
        rating: rating_calc,
      }, {
        where: {
          id: book.id,
        }
      })

      book = await Book.findOne({
        where: {
          id,
        },
        attributes: [
          'id', 'title', 'author', 'available', 'rating'
        ],
        include: [
          Rating,
        ]
      })

      return res.status(200).json(book);
    } catch (error) {
      // return res.status(404).json(error);
      return console.log(error)
    }
  }

  async userGetBooks(req, res){
    try {
      const bookIds = await Book.findAll({
        attributes: [
          'id', 'title', 'times_taken',
        ],
        order: [
          ['times_taken', 'DESC']
        ]
      })

      return res.status(200).json(bookIds)
    } catch (error) {
      return res.status(404).json(error)
    }
  }
}

export default new BookController()
