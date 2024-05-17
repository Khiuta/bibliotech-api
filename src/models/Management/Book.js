import Sequelize, { Model } from 'sequelize';

export default class Book extends Model {
  static init(sequelize) {
    super.init({
      title: Sequelize.STRING,
      author: Sequelize.STRING,
      edition: Sequelize.INTEGER,
      volume: Sequelize.INTEGER,
      editor: Sequelize.STRING,
      release_year: Sequelize.INTEGER,
      ident_number: Sequelize.INTEGER,
      quantity: Sequelize.INTEGER,
      available: Sequelize.INTEGER,
      rating: Sequelize.FLOAT,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', (book) => {
      book.available = book.quantity;
    })
    return this;
  }
}
