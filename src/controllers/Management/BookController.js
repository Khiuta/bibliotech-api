import Book from "../../models/Management/Book";
import Rating from "../../models/Management/Rating";

import axios from "axios";
import sharp from "sharp";

import path from "path";
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

        async function getAllBooks(data){
          const collection = [];
          let qtt = 1;

          for(let i = 0; i < data.length; i++){
            try {
              if(data[i][0] === data[i+1][0]){
                qtt++;
              } else {
                // pega a url do livro para buscar
                const googleBooksApiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${data[i][0]}`;
                // busca o livro na api de livros do Google
                const response = await axios.get(googleBooksApiUrl);
                // armazena todos os livros encontrados numa variável
                let books = response.data.items;
                /* filtra o livro pelo autor
                book é um array de objetos, dentro de cada objeto existe a propriedade volumeInfo
                dentro do volumeInfo existe a propriedade "authors", que é um array
                portanto, se aplica outro filter no book.volumeInfo.authors para encontrar um livro
                em que os autores coincidem com os autores do livro que se deseja adicionar
                */
                let author = data[i][1];
                author = author.split('/')[0];
                function filterBook(){
                  let newBook = {};
                  books.forEach(book => {
                    if(book.volumeInfo.authors){
                      book.volumeInfo.authors.forEach(bookAuthor => {
                        if(bookAuthor.toLowerCase() === author.split('/')[0].toLowerCase()){
                          newBook = book;
                        }
                      })
                    }
                  });
                  return newBook;
                }
                const book = filterBook();
                // checa se o livro possui imagem
                try {
                  // pega a url da imagem do livro
                  let imageUrl = book.volumeInfo.imageLinks.thumbnail;
                  // retira o zoom da imagem para melhorar a qualidade
                  imageUrl = imageUrl.replace('zoom=1', 'zoom=0');

                  const imageResponse = await axios({
                    url: imageUrl,
                    responseType: 'arraybuffer'
                  });

                  const buffer = Buffer.from(imageResponse.data, 'binary');
                  // tratamento da imagem
                  const resizedImageBuffer = await sharp(buffer)
                      .resize({ width: 600, height: 800, fit: 'inside', withoutEnlargement: true }) // Defina o tamanho desejado aqui
                      .jpeg({ quality: 100, progressive: true })
                      .toBuffer();

                  const imagePath = path.join('./', 'public', '/images', `${book.id}.jpg`);
                  fs.writeFileSync(imagePath, resizedImageBuffer);

                  let bookDescription = '';
                  try {
                    bookDescription = book.volumeInfo.description;
                  } catch(e) {
                    bookDescription = '';
                  }

                  const newBook = {
                    title: data[i][0],
                    author: data[i][1],
                    description: bookDescription,
                    release_year: data[i][3],
                    edition: data[i][4],
                    editor: data[i][5],
                    quantity: qtt,
                    available: qtt,
                    image_path: imagePath,
                  }

                  collection.push(newBook)
                  qtt = 1;
                } catch(err) {
                  // se o livro não possui imagem, deixar a imagem do logo do bibliotech como capa
                  const imagePath = path.join('./', 'public', '/images', 'logo-png.png');

                  let bookDescription = '';
                  try {
                    bookDescription = book.volumeInfo.description;
                  } catch(e) {
                    bookDescription = '';
                  }

                  const newBook = {
                    title: data[i][0],
                    author: data[i][1],
                    description: bookDescription,
                    release_year: data[i][3],
                    edition: data[i][4],
                    editor: data[i][5],
                    quantity: qtt,
                    available: qtt,
                    image_path: imagePath,
                  }

                  collection.push(newBook)
                  qtt = 1;
                }
              }
            } catch (error) {
              // pega a url do livro para buscar
              const googleBooksApiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${data[i][0]}`;
              // busca o livro na api de livros do Google
              const response = await axios.get(googleBooksApiUrl);
              // armazena todos os livros encontrados numa variável
              let books = response.data.items;
              /* filtra o livro pelo autor
              book é um array de objetos, dentro de cada objeto existe a propriedade volumeInfo
              dentro do volumeInfo existe a propriedade "authors", que é um array
              portanto, se aplica outro filter no book.volumeInfo.authors para encontrar um livro
              em que os autores coincidem com os autores do livro que se deseja adicionar
              */
              let author = data[i][1];
              author = author.split('/')[0];
              function filterBook(){
                let newBook = {};
                books.forEach(book => {
                  if(book.volumeInfo.authors){
                    book.volumeInfo.authors.forEach(bookAuthor => {
                      if(bookAuthor.toLowerCase() === author.split('/')[0].toLowerCase()){
                        newBook = book;
                      }
                    })
                  }
                });
                return newBook;
              }
              const book = filterBook();
              // checa se o livro tem imagem
              try {
                let imageUrl = book.volumeInfo.imageLinks.thumbnail;
                imageUrl = imageUrl.replace('zoom=1', 'zoom=0');

                const imageResponse = await axios({
                  url: imageUrl,
                  responseType: 'arraybuffer'
                });

                const buffer = Buffer.from(imageResponse.data, 'binary');
                // tratando a imagem
                const resizedImageBuffer = await sharp(buffer)
                    .resize({ width: 600, height: 800, fit: 'inside', withoutEnlargement: true }) // Defina o tamanho desejado aqui
                    .jpeg({ quality: 100, progressive: true })
                    .toBuffer();

                const imagePath = path.join('./', 'public', '/images', `${book.id}.jpg`);
                fs.writeFileSync(imagePath, resizedImageBuffer);

                let bookDescription = '';
                try {
                  bookDescription = book.volumeInfo.description;
                } catch(e) {
                  bookDescription = '';
                }

                const newBook = {
                  title: data[i][0],
                  author: data[i][1],
                  description: bookDescription,
                  release_year: data[i][3],
                  edition: data[i][4],
                  editor: data[i][5],
                  quantity: qtt,
                  available: qtt,
                  image_path: imagePath,
                }

                collection.push(newBook)
                qtt = 1;
              } catch(err) {
                const imagePath = path.join('./', 'public', '/images', 'logo-png.png');

                let bookDescription = '';
                try {
                  bookDescription = book.volumeInfo.description;
                } catch(e) {
                  bookDescription = '';
                }

                const newBook = {
                  title: data[i][0],
                  author: data[i][1],
                  description: bookDescription,
                  release_year: data[i][3],
                  edition: data[i][4],
                  editor: data[i][5],
                  quantity: qtt,
                  available: qtt,
                  image_path: imagePath,
                }

                collection.push(newBook)
                qtt = 1;
              }
            }
          }

          return collection;
        }

        const allBooks = await getAllBooks(obj[0].data.slice(1, undefined));
        console.log(allBooks)
        const newCollection = await Book.bulkCreate(allBooks);

        // fs.unlink(`uploads/files/${filename}`, (err) => {
        //   if (err) {
        //     // Handle specific error if any
        //     if (err.code === 'ENOENT') {
        //       console.error('File does not exist.');
        //     } else {
        //       throw err;
        //     }
        //   } else {
        //     console.log('File deleted!');
        //   }
        // });

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
      // pega a url do livro para buscar
      const googleBooksApiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`;
      // busca o livro na api de livros do Google
      const response = await axios.get(googleBooksApiUrl);
      // armazena todos os livros encontrados numa variável
      let book = response.data.items;
      /* filtra o livro pelo autor
      book é um array de objetos, dentro de cada objeto existe a propriedade volumeInfo
      dentro do volumeInfo existe a propriedade "authors", que é um array
      portanto, se aplica outro filter no book.volumeInfo.authors para encontrar um livro
      em que os autores coincidem com os autores do livro que se deseja adicionar
      */
      book = book.filter(book => book.volumeInfo.authors.filter(bookAuthor => bookAuthor.toLowerCase().includes(author.toLowerCase)))

      if(!book){
        return res.status(404).json('Livro não encontrado.')
      }

      console.log(book[0])

      let imageUrl = book[0].volumeInfo.imageLinks.thumbnail;
      imageUrl = imageUrl.replace('zoom=1', 'zoom=0');

      const imageResponse = await axios({
        url: imageUrl,
        responseType: 'arraybuffer'
      });

      const buffer = Buffer.from(imageResponse.data, 'binary');

      const resizedImageBuffer = await sharp(buffer)
          .resize({ width: 100, height: 350, fit: 'inside', withoutEnlargement: true }) // Defina o tamanho desejado aqui
          .jpeg({ quality: 100, progressive: true })
          .toBuffer();

      const imagePath = path.join('./', 'public', '/images', `${book[0].id}.jpg`);
      fs.writeFileSync(imagePath, resizedImageBuffer);

      const newBook = await Book.create({ title, author, edition, editor, release_year, quantity, image_path: imagePath })

      return res.status(200).json(newBook)
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
      if(ratings === 0){
        rating_calc = 0;
      } else {
        rating_calc /= ratings;
      }
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
          'id', 'title', 'author', 'available', 'rating', 'image_path', 'description'
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
          'id', 'title', 'times_taken', 'image_path', 'rating'
        ],
        order: [
          ['times_taken', 'DESC']
        ]
      })

      // bookIds.forEach(el => {
      //   const filename = el.image_path.split('\\').pop();
      //   const imagePath = path.join(__dirname, '../', '../', '../', 'uploads', 'images', filename);
      //   return res.sendFile(imagePath)
      // });
      return res.status(200).json(bookIds)
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)
    }
  }

  async userGetBookImage(req, res){
    const { filename } = req.params;
    try {
      const imagePath = path.join(__dirname, '../', '../', '../', 'public', 'images', filename)
      return res.sendFile(imagePath)
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  }
}

export default new BookController()
