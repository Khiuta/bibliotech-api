import jwt from 'jsonwebtoken';
import Student from '../../models/Students/Student';

class TokenController {
  async store(req, res) {
    const { full_name = '', password = '' } = req.body;

    if (!full_name || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas.'],
      });
    }

    const student = await Student.findOne({ where: { full_name } });

    if (!student) {
      return res.status(401).json({
        errors: ['Usuário inexistente.'],
      });
    }

    if (!(await student.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha incorreta.'],
      });
    }

    const { id } = student;
    const token = jwt.sign({ id, full_name }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenController();
