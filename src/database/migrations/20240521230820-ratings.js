/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ratings', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    book_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    student_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    student_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id',
      },
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    star_rating: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('ratings'),
};
