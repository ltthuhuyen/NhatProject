'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        address_name: {
            type: Sequelize.STRING
        },
        userId: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        ward_name: {
          type: Sequelize.STRING
        },
        district_name: {
          type: Sequelize.STRING
        }, 
        city_name: {
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
        // wardId: {
        //     allowNull: false,
        //     type: Sequelize.INTEGER
        // }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Addresses');
  }
}