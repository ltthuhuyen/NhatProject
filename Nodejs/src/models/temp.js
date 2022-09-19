'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Temp.belongsTo(models.User, { foreignKey: 'giverId', targetKey: 'id', as: 'giverTemp' })
        // Temp.belongsTo(models.User, { foreignKey: 'recipientId', targetKey: 'id', as: 'recipientTemp' })
        Temp.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'productTemp' })
        Temp.belongsTo(models.Allcode, { foreignKey: 'statusType', targetKey: 'keyMap', as: 'statusTypeTemp' })
        Temp.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeTemp' })
    }
  };
    Temp.init({
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        giverId: DataTypes.INTEGER,
        // recipientId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        statusType: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Temp',
    });
    return Temp;
};