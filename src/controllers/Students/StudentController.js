import Student from "../../models/Students/Student";
import Rating from '../../models/Management/Rating';
import Request from "../../models/Management/Request";
import Notification from "../../models/Students/Notification";

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

  async show(req, res) {
    try {
      const id = req.userId;
      const student = await Student.findOne({
        where: {
          id,
        },
        include: [
          Rating, Request, Notification
        ],
        attributes: [
          'id',
          'full_name',
          'student_class',
          'grade',
        ]
      })

      return res.status(200).json(student)
    } catch (error) {
      return console.log(error)
    }
  }
}

export default new StudentController();
