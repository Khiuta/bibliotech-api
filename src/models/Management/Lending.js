import Sequelize, { Model } from 'sequelize';
import Book from './Book';

export default class Lending extends Model {
  static init(sequelize) {
    super.init({
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
      lending_date_hidden: Sequelize.STRING,
      lending_date: Sequelize.STRING,
      return_date: Sequelize.STRING,
      pendent: Sequelize.BOOLEAN,
      renewed: Sequelize.BOOLEAN,
      returned: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });
    return this;
  }
}
