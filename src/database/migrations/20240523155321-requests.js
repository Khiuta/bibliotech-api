/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('requests', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    request_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    book_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    book_author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    book_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    student_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    student_class: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    student_grade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    student_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('requests'),
};
