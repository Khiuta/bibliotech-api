import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Manager extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      surname: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      username: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
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
