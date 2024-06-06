'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      student_class: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      starred_books: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      read_books: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      stopped_books: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      current_book: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      notifications: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      can_borrow: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      pending: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students')
  }
};
