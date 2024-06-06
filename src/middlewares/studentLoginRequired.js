import jwt from 'jsonwebtoken';
import Student from '../models/Students/Student';

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
    const { id, full_name } = dados;
1
    const student = await Student.findOne({
      where: {
        id,
        full_name,
      },
    });

    if (!student) {
      return res.status(401).json({
        errors: ['Usuário inválido.'],
      });
    }

    req.userId = id;
    req.userFullName = full_name;
    return next();
  } catch (e) {
    return res.status(403).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};
