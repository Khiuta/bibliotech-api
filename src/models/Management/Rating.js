import Sequelize, { Model } from 'sequelize';
import Book from './Book';
import Student from '../Students/Student';

export default class Rating extends Model {
  static init(sequelize) {
    super.init({
      book_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references: {
          model: Book,
          key: 'id',
        },
      },
      student_name: Sequelize.STRING,
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Student,
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      comment: Sequelize.TEXT,
      star_rating: Sequelize.FLOAT,
    }, {
      sequelize,
    });
    return this;
  }
}
