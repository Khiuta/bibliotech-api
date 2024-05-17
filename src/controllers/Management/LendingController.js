import Lending from "../../models/Management/Lending";
import moment from "moment";

class LendingController {
  async store(req, res){
    const {
      book_name,
      book_author,
      student_name,
      student_class,
      student_grade,
    } = req.body;

    const lending_date_hidden = moment().format();
    const lending_date = moment().format('DD/MM/YYYY');
    const return_date = moment().add(15, 'days').format('DD/MM/YYYY')

    try {
      const newLending = await Lending.create({
        book_name,
        book_author,
        student_name,
        student_class,
        student_grade,
        lending_date,
        lending_date_hidden,
        return_date
      });

      return res.status(200).json(newLending)
    } catch (error) {
      return console.log(error)
    }
  }

  async index(req, res){
    try {
      const lendings = await Lending.findAll();

      lendings.forEach((lend) => {
        const r_date = moment(lend.lending_date_hidden).add(15, 'days')
        const today = moment().format()
        const after = moment(today).isAfter(r_date)
        console.log(after)
        if(after){
          lend.pendent = true;
        }
      })

      return res.status(200).json(lendings);
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new LendingController()
