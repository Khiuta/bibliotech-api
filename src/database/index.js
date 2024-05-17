import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Manager from '../models/Management/Manager';
import Book from '../models/Management/Book';
import Student from '../models/Students/Student';
import Lending from '../models/Management/Lending';

const models = [Manager, Book, Student, Lending];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
