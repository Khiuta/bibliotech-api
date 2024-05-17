import jwt from 'jsonwebtoken';
import Student from '../../models/Students/Student';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas.'],
      });
    }

    const student = await Student.findOne({ where: { email } });

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
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenController();
