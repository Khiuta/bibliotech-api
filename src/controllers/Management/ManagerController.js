import Manager from '../../models/Management/Manager';

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
      const managers = await Manager.findAll();

      return res.status(200).json(managers)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new ManagerController()
