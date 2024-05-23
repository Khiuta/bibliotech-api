import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      full_name: Sequelize.TEXT,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      student_class: Sequelize.STRING,
      grade: Sequelize.INTEGER,
      starred_books: Sequelize.ARRAY(Sequelize.INTEGER),
      read_books: Sequelize.ARRAY(Sequelize.INTEGER),
      stopped_books: Sequelize.ARRAY(Sequelize.INTEGER),
      current_book: Sequelize.STRING,
      notifications: Sequelize.ARRAY(Sequelize.STRING),
      pending: Sequelize.BOOLEAN,
      can_borrow: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      user.password_hash = await bcryptjs.hash(user.password, 8)
    });
    return this;
  }
  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
