/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('lendings', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
        key: 'id'
      }
    },
    lending_date_hidden: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lending_date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    return_date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pendent: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    renewed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    returned: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('lendings'),
};
