'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        static associate(models) {
            // Address.belongsTo(models.Ward, { foreignKey: 'wardId', targetKey: 'id', as: 'wardData' })
            Address.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'userData' })
            Address.hasMany(models.Schedule, { foreignKey: 'addressId', as: 'addressData' })
            Address.hasMany(models.Temp, { foreignKey: 'addressId', as: 'addressTemp' })
        }
  };
    Address.init({
        userId: DataTypes.INTEGER,
        address_name: DataTypes.STRING,
        ward_name: DataTypes.STRING,
        district_name: DataTypes.STRING,
        city_name: DataTypes.STRING
       
    }, {
        sequelize,
        modelName: 'Address',
    });
  return Address ;
};