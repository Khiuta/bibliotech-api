import Notification from "../../models/Students/Notification";

class NotificationController {
  async store(req, res){
    const { title, message } = req.body;

    try {
      const newNotification = await Notification.create({ title, message });

      return res.status(200).json(newNotification);
    } catch (error) {
      return console.log(error);
    }
  }
}

export default new NotificationController();
