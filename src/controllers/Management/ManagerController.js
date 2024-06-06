import Manager from '../../models/Management/Manager';
import Note from '../../models/Management/Note';

class ManagerController {
  async store(req, res) {
    const {
      name, surname, username, password,
    } = req.body

    try {
      const newManager = await Manager.create({ name, surname, username, password })

      return res.status(200).json(newManager);
    } catch (error) {
      return res.json(error)
    }
  }

  async index(req, res) {
    try {
      const managers = await Manager.findAll({
        include: [
          Note,
        ]
      });

      return res.status(200).json(managers)
    } catch (error) {
      return res.json(error)
    }
  }

  async show(req, res){
    const id = req.userId;

    try {
      const manager = await Manager.findOne({
        where: {
          id,
        },
        include: [
          Note,
        ]
      })

      return res.status(200).json(manager);
    } catch (error) {
      return console.log(error);
    }
  }
}

export default new ManagerController()
