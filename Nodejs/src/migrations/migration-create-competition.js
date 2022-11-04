'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Competitions', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.BLOB('long'),
      },
      contentHTML: {
        allowNull: false,
        type: Sequelize.TEXT('long')
        },
      contentMarkdown: {
        allowNull: false,
        type: Sequelize.TEXT('long')
        },
      description: {
        allowNull: true,
        type: Sequelize.TEXT('long')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Competitions');
  }
};