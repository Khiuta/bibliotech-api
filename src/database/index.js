import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Manager from '../models/Management/Manager';
import Book from '../models/Management/Book';
import Student from '../models/Students/Student';
import Lending from '../models/Management/Lending';
import Rating from '../models/Management/Rating';

const models = [Manager, Book, Student, Lending, Rating];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

// #region Associating
Book.hasMany(Rating);
Student.hasMany(Rating);
Rating.belongsTo(Book);
Rating.belongsTo(Student);
// #endregion
