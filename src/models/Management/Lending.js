import Sequelize, { Model } from 'sequelize';

export default class Lending extends Model {
  static init(sequelize) {
    super.init({
      book_name: Sequelize.STRING,
      book_author: Sequelize.STRING,
      student_name: Sequelize.STRING,
      student_class: Sequelize.STRING,
      student_grade: Sequelize.STRING,
      lending_date_hidden: Sequelize.STRING,
      lending_date: Sequelize.STRING,
      return_date: Sequelize.STRING,
      pendent: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });
    return this;
  }
}
