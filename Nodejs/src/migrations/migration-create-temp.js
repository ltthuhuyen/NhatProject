'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('temps', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.STRING
        },
        timeType: {
            type: Sequelize.STRING
        },
        giverId: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        // recipientId: {
        //     allowNull: false,
        //     type: Sequelize.INTEGER
        // },
        productId: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        statusType: {
            type: Sequelize.STRING
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
    await queryInterface.dropTable('temps');
  }
};
