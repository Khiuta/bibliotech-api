import jwt from 'jsonwebtoken';
import Manager from '../../models/Management/Manager';

class TokenController {
  async store(req, res) {
    const { username = '', password = '' } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas.'],
      });
    }

    const manager = await Manager.findOne({ where: { username } });

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
    const token = jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenController();
