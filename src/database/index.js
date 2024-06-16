import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Manager from '../models/Management/Manager';
import Book from '../models/Management/Book';
import Student from '../models/Students/Student';
import Lending from '../models/Management/Lending';
import Rating from '../models/Management/Rating';
import Request from '../models/Management/Request';
import Notification from '../models/Students/Notification';
import Note from '../models/Management/Note';

const models = [Manager, Student, Book, Lending, Rating, Request, Notification, Note];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

// #region Associating
Book.hasMany(Rating);
Student.hasMany(Rating);
Rating.belongsTo(Book);
Rating.belongsTo(Student);

Book.hasOne(Request);
Student.hasOne(Request);
Request.belongsTo(Book);
Request.belongsTo(Student);

Student.hasMany(Notification);
Notification.belongsTo(Student);

Book.hasOne(Lending);
Lending.belongsTo(Book);

Manager.hasMany(Note);
Note.belongsTo(Manager);
// #endregion
