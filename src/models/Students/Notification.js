import Sequelize, { Model } from 'sequelize';
import Student from './Student';

export default class Notification extends Model {
  static init(sequelize) {
    super.init({
      notification_type: Sequelize.INTEGER,
      title: Sequelize.STRING,
      message: Sequelize.TEXT,
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Student,
          key: 'id',
        },
      },
    }, {
      sequelize,
    });
    return this;
  }
}
