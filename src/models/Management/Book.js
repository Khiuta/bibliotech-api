import Sequelize, { Model } from 'sequelize';
import Student from '../Students/Student';

export default class Book extends Model {
  static init(sequelize) {
    super.init({
      title: Sequelize.STRING,
      author: Sequelize.STRING,
      description: Sequelize.TEXT,
      edition: Sequelize.STRING,
      editor: Sequelize.STRING,
      image_path: Sequelize.STRING,
      release_year: Sequelize.INTEGER,
      quantity: Sequelize.INTEGER,
      available: Sequelize.INTEGER,
      rating: Sequelize.FLOAT,
      times_taken: Sequelize.INTEGER,
      scheduled_by: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', (book) => {
      book.available = book.quantity;
    })
    return this;
  }
}
