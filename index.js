import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();
import './src/database';

import managerRoutes from './src/routes/Management/managerRoutes';
import managerTokenRoutes from './src/routes/Management/managerTokenRoutes';
import bookRoutes from './src/routes/Management/bookRoutes';
import lendingRoutes from './src/routes/Management/lendingRoutes';
import studentRoutes from './src/routes/Students/studentRoutes';
import studentTokenRoutes from './src/routes/Students/studentTokenRoutes';
import ratingRoutes from './src/routes/Management/ratingRoutes';

const whiteList = [
  'http://localhost:3000',
  'http:192.168.0.27:3000'
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS.'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/manager', managerRoutes);
    this.app.use('/manager-login', managerTokenRoutes);
    this.app.use('/book', bookRoutes);
    this.app.use('/lending', lendingRoutes);
    this.app.use('/student', studentRoutes);
    this.app.use('/student-login', studentTokenRoutes);
    this.app.use('/rating', ratingRoutes);
  }
}

export default new App().app;
