import multer from 'multer';
import { extname, resolve } from 'path';

// gerando um nome aleatório para o arquivo
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return cb(new multer.MulterError('Arquivo precisa ser XLSX.'));
    }

    return cb(null, true);
  },
  // especificando onde esse arquivo vai ser guardado
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'files'));
    },
    // especificando qual vai ser o nome do arquivo
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    },
  }),
};
