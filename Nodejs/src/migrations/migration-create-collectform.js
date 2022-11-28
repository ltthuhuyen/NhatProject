"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("collectionforms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      scheduleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      recipientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      registerDate: {
        type: Sequelize.DATE,
      },
      receivedDate: {
        type: Sequelize.DATE,
      },

      statusType: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("collectionforms");
  },
};
