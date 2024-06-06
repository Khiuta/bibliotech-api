import Note from "../../models/Management/Note";

class NoteController {
  async store(req, res) {
    const { text } = req.body;
    const manager_id = req.userId;
    try {
      const newNote = await Note.create({ text, manager_id })

      return res.status(200).json(newNote);
    } catch (error) {
      return console.log(error);
    }
  }

  async destroy(req, res){
    const { id } = req.params;

    try {
      await Note.destroy({
        where: {
          id,
        }
      })

      return res.status(200).json();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}

export default new NoteController();
