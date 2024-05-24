import Lending from "../../models/Management/Lending";
import Book from '../../models/Management/Book';
import moment from "moment";

class LendingController {
  //post request
  async store(req, res){
    const {
      book_name,
      book_author,
      book_id,
      student_name,
      student_class,
      student_grade,
    } = req.body;

    const lending_date_hidden = moment().format();
    const lending_date = moment().format('DD/MM/YYYY');
    const return_date = moment().add(15, 'days').format('DD/MM/YYYY')

    try {
      const book = await Book.findOne({
        where: {
          id: book_id,
        }
      })
      console.log(book)
      if(book.available > 0){
        const newLending = await Lending.create({
          book_name,
          book_author,
          book_id,
          student_name,
          student_class,
          student_grade,
          lending_date,
          lending_date_hidden,
          return_date
        });
        const newAvailable = book.available -= 1;
        await Book.update({
          available: newAvailable,
        }, {
          where: {
            id: book_id,
          }
        })

        return res.status(200).json(newLending)
      }
      return console.log('Este livro não está com exemplares disponíveis.');
    } catch (error) {
      return console.log(error)
    }
  }

  //get request
  async index(req, res){
    try {
      const lendings = await Lending.findAll();

      lendings.forEach((lend) => {
        const r_date = moment(lend.lending_date_hidden).add(15, 'days')
        const today = moment().format()
        const after = moment(today).isAfter(r_date)
        if(after){
          lend.pendent = true;
          Lending.update({
            pendent: true,
          }, {
            where: {
              id: lend.id,
            }
          })
        }
      })

      return res.status(200).json(lendings);
    } catch (error) {
      return res.json(error)
    }
  }

  async update(req, res){
    try {
      const { id } = req.params;
      await Lending.update({
        returned: true,
      }, {
        where: {
          id,
        }
      })

      return res.status(200).json('Livro entregue!');
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new LendingController()
