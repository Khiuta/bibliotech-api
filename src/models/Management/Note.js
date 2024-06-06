import Sequelize, { Model } from 'sequelize';
import Manager from './Manager';

export default class Note extends Model {
  static init(sequelize) {
    super.init({
      text: Sequelize.TEXT,
      manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Manager,
          key: 'id',
        },
      },
    }, {
      sequelize,
    });
    return this;
  }
}
