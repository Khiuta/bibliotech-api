import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

dotenv.config();
import './src/database';

import managerRoutes from './src/routes/Management/managerRoutes';
import managerTokenRoutes from './src/routes/Management/managerTokenRoutes';
import bookRoutes from './src/routes/Management/bookRoutes';
import lendingRoutes from './src/routes/Management/lendingRoutes';
import studentRoutes from './src/routes/Students/studentRoutes';
import studentTokenRoutes from './src/routes/Students/studentTokenRoutes';
import ratingRoutes from './src/routes/Management/ratingRoutes';
import requestRoutes from './src/routes/Management/requestRoutes';
import notificationRoutes from './src/routes/Students/notificationRoutes';
import noteRoutes from './src/routes/Management/noteRoutes';

const whiteList = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://192.168.0.27:3000',
  'http://192.168.0.5:3000'
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} Not allowed by CORS.`));
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
    this.app.use(express.static('public'));
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
    this.app.use('/request', requestRoutes);
    this.app.use('/notification', notificationRoutes);
    this.app.use('/note', noteRoutes);
  }
}

export default new App().app;
