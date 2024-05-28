import Request from "../../models/Management/Request";
import Notification from '../../models/Students/Notification';

class RequestController {
  //post action
  async store(req, res){
    const {
      request_type,
      book_name,
      book_author,
      book_id,
      student_name,
      student_class,
      student_grade,
      student_id
    } = req.body;

    try {
      const newRequest = await Request.create({
        request_type,
        book_name,
        book_author,
        book_id,
        student_name,
        student_class,
        student_grade,
        student_id
      });

      return res.status(200).json(newRequest);
    } catch (error) {
      //return res.status(400).json(error);
      return console.log(error)
    }
  }

  //get action
  async index(req, res){
    try {
      const requests = await Request.findAll();

      return res.status(200).json(requests);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async update(req, res){
    try {
      const { id, action } = req.params; // accepted | refused

      await Request.update({
        status: action,
      }, {
        where: {
          id,
        }
      });

      return res.status(200).json(action === 'accepted' ? 'Pedido aceito!' : 'Pedido recusado!');
    } catch (error) {
      return console.log(error);
    }
  }
}

export default new RequestController();
