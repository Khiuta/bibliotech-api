'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('books', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      edition: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      editor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      release_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      image_path: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      available: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      times_taken: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      scheduled_by: {
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
    return queryInterface.dropTable('books')
  }
};
