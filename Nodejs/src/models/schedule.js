'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' })
        Schedule.belongsTo(models.User, { foreignKey: 'giverId', targetKey: 'email', as: 'giverData' })
    }
  };
  Schedule.init({
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        giverId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER
        
    }, {
        sequelize,
        modelName: 'Schedule',
    });
  return Schedule;
};