import Student from "../../models/Students/Student";

class StudentController {
  async store(req, res){
    const {
      full_name,
      password,
      student_class,
      grade,
    } = req.body;

    try {
      const newStudent = await Student.create({
        full_name,
        password,
        student_class,
        grade,
      })

      return res.status(200).json(newStudent);
    } catch (error) {
      return res.json(error)
    }
  }

  async index(req, res){
    try {
      const students = await Student.findAll()

      return res.status(200).json(students)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new StudentController();
