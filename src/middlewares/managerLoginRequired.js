import jwt from 'jsonwebtoken';
import Manager from '../models/Management/Manager';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login necessário.'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, username } = dados;

    const manager = await Manager.findOne({
      where: {
        id,
        username,
      },
    });

    if (!manager) {
      return res.status(401).json({
        errors: ['Usuário inválido.'],
      });
    }

    req.userId = id;
    req.userName = username;
    return next();
  } catch (e) {
    return res.status(403).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};
