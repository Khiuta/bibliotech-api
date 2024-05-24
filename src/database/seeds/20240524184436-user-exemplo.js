'use strict';
import bcrypt from 'bcryptjs';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('managers', [
      {
        name: 'John',
        surname: 'Doe',
        username: 'johndoe',
        password_hash: bcrypt.hash('novasenha', 8),
        notes: [],
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('managers', null, {});
  }
};
