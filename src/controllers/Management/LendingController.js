import Lending from "../../models/Management/Lending";
import Book from '../../models/Management/Book';
import moment from "moment";
import Student from "../../models/Students/Student";

class LendingController {
  //post request
  async store(req, res){
    const {
      book_name,
      book_author,
      student_name,
      student_class,
      student_grade,
    } = req.body;

    //data do empréstimo no formato ISO, para uso de funções do moment como: isAfter
    //essa data não é mostrada em nenhum lugar no site
    const lending_date_hidden = moment().format();
    //data do empréstimo no formato padrão, pode ser usada no site
    const lending_date = moment().format('DD/MM/YYYY');
    //data de retorno no formato padrão, não deve ser usada para comparar com a lending_date_hidden, apenas para mostrar no site
    const return_date = moment().add(15, 'days').format('DD/MM/YYYY')

    try {
      //achando o livro que foi emprestado
      const book = await Book.findOne({
        where: {
          title: book_name,
          author: book_author,
        }
      });
      //pegando o id do livro
      const book_id = book.id;
      //achando o estudante que pegou o livro
      const student = await Student.findOne({
        where: {
          full_name: student_name,
          student_class,
          grade: student_grade,
        }
      });
      //atualizando o estado de poder pegar empréstimo do aluno
      //Com livro -> não pode pegar outro até entregar (can_borrow: false)
      //Sem livro -> pode pegar livro (can_borrow: true)
      await Student.update({
        can_borrow: false,
      }, {
        where: {
          id: student.id,
        }
      })
      //se há exemplares disponíveis no sistema
      if(book.available > 0){
        const newLending = await Lending.create({
          book_name,
          book_author,
          book_id,
          student_name,
          student_class,
          student_grade,
          student_id: student.id,
          lending_date,
          lending_date_hidden,
          return_date
        });
        //atualizando o número de exemplares disponíveis do livro, através de variáveis auxiliares
        const newAvailable = book.available -= 1;
        //atualizando o número de vezes que o número foi pego, usando a mesma lógica
        const newTimesTaken = book.times_taken += 1;
        //atualizando os dados do livro emprestado
        await Book.update({
          available: newAvailable,
          times_taken: newTimesTaken,
        }, {
          where: {
            id: book_id,
          }
        })

        return res.status(200).json(newLending)
      }
      //se não há exemplares disponíveis, mostrar mensagem correspondente
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

  //findOne method for student platform
  async GetStudentLending(req, res){
    const student_id = req.userId;

    try {
      const lending = await Lending.findOne({
        where: {
          student_id,
        },
        attributes: [
          'book_name', 'book_author', 'book_id', 'return_date'
        ]
      });

      return res.status(200).json(lending);
    } catch (error) {
      console.log(error);
      return res.status(404).json(error);
    }
  }

  async ReturnBookUpdate(req, res){
    try {
      const { id, book_id } = req.params;
      // atualizando o controle de retorno do livro
      await Lending.update({
        returned: true,
      }, {
        where: {
          id,
        }
      });
      //encontrando o livro retornado
      const book = await Book.findOne({
        where: {
          id: book_id,
        }
      });
      //atualizando o número de livros disponíveis
      const newAvailable = book.available += 1;
      await Book.update({
        available: newAvailable,
      }, {
        where: {
          id: book_id,
        }
      });
      //encontrando o aluno que devolveu o livro
      const lending = await Lending.findOne({
        where: {
          id,
        }
      });
      await Student.update({
        can_borrow: true,
      }, {
        where: {
          full_name: lending.student_name,
          student_class: lending.student_class,
          grade: lending.student_grade,
        }
      });

      return res.status(200).json('Livro entregue!');
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async DelayReturnDateUpdate(req, res){
    const { book_id } = req.params;
    try {
      const lending = await Lending.findOne({
        where: {
          book_id: book_id,
        }
      });

      let newReturnDate = lending.return_date;
      newReturnDate = moment(lending.lending_date_hidden).add(22, 'days').format('DD/MM/YYYY');
      console.log(newReturnDate)

      await Lending.update({
        return_date: newReturnDate,
      }, {
        where: {
          id: lending.id,
        }
      });

      return res.status(200).json('Entrega adiada.')
    } catch (error) {
      console.log(error)
      return res.status(400).json(error);
    }
  }
}

export default new LendingController()
