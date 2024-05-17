import Book from "../../models/Management/Book";

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
}

export default new BookController()
