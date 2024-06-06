/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('notes', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    manager_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'managers',
        key: 'id',
      },
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('notes'),
};
