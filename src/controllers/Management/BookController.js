import Book from "../../models/Management/Book";
import Rating from "../../models/Management/Rating";

class BookController {
  async store(req, res){
    const {
      title, author, edition, volume, editor, release_year, ident_number, quantity
    } = req.body;

    try {
      const newBook = await Book.create({ title, author, edition, volume, editor, release_year, ident_number, quantity })

      return res.status(200).json(newBook)
    } catch (error) {
      return res.json(error)
    }
  }

  async index(req, res){
    try {
      const books = await Book.findAll()

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

  async userGetBookIds(req, res){
    try {
      const bookIds = await Book.findAll({
        attributes: [
          'id', 'title',
        ]
      })

      return res.status(200).json(bookIds)
    } catch (error) {
      return res.status(404).json(error)
    }
  }
}

export default new BookController()
