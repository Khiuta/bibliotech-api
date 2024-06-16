/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('books', 'description', {
    type: Sequelize.TEXT,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('books', 'description'),
};
