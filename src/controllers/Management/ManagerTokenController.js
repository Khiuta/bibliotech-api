import jwt from 'jsonwebtoken';
import Manager from '../../models/Management/Manager';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas.'],
      });
    }

    const manager = await Manager.findOne({ where: { email } });

    if (!manager) {
      return res.status(401).json({
        errors: ['Usuário inexistente.'],
      });
    }

    if (!(await manager.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha incorreta.'],
      });
    }

    const { id } = manager;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenController();
