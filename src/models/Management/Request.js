import Sequelize, { Model } from 'sequelize';
import Student from '../Students/Student';
import Book from './Book';

export default class Request extends Model {
  static init(sequelize) {
    super.init({
      request_type: Sequelize.STRING,
      book_name: Sequelize.STRING,
      book_author: Sequelize.STRING,
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Book,
          key: 'id',
        },
      },
      student_name: Sequelize.STRING,
      student_class: Sequelize.STRING,
      student_grade: Sequelize.INTEGER,
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Student,
          key: 'id',
        },
      },
      status: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }
}
