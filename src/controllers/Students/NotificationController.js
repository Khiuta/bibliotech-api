import Notification from "../../models/Students/Notification";

class NotificationController {
  async store(req, res){
    const { notification_type, book_title, student_id } = req.body;

    try {
      /*
      Notification Types
      1 - Agendamento recusado
      2 - Agendamento aceito
      3 - Adiamento recusado
      4 - Adiamento aceito
      */
     let title = '';
     let message = '';

      switch(notification_type){
        case 1:
          title = 'Agendamento recusado';
          message = `Seu pedido de agendamento do livro ${book_title} foi recusado.`
          break;
        case 2:
          title = 'Agendamento aceito';
          message = `Seu pedido de agendamento do livro ${book_title} foi aceito. Você tem 1 dia para retirar o livro!`
          break;
        case 3:
          title = 'Adiamento recusado';
          message = `Seu pedido de adiamento de entrega do livro ${book_title} foi recusado.`
          break;
        case 4:
          title = 'Adiamento aceito';
          message = `Seu pedido de adiamento de entrega do livro ${book_title} foi aceito. Aproveite a leitura!`
          break;
        default:
          break;
      }

      const newNotification = await Notification.create({ notification_type, title, message, student_id });

      return res.status(200).json(newNotification);
    } catch (error) {
      return console.log(error);
    }
  }

  async clear(req, res){
    const userId = req.userId;

    try {
      await Notification.destroy({
        where: {
          student_id: userId,
        }
      });
    } catch (error) {
      return console.log(error);
    }
  }
}

export default new NotificationController();
