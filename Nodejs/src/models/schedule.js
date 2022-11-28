"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.hasMany(models.Collectionform, {
        foreignKey: "scheduleId",
        as: "scheduleData",
      });
      Schedule.belongsTo(models.Allcode, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypeData",
      });
      Schedule.belongsTo(models.User, {
        foreignKey: "giverId",
        targetKey: "id",
        as: "giverData",
      });
      Schedule.belongsTo(models.Address, {
        foreignKey: "addressId",
        targetKey: "id",
        as: "addressData",
      });

      Schedule.belongsTo(models.Product, {
        foreignKey: "productId",
        targetKey: "id",
        as: "productData",
      });
      Schedule.belongsTo(models.Allcode, {
        foreignKey: "statusType",
        targetKey: "keyMap",
        as: "statusData",
      });
    }
  }
  Schedule.init(
    {
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      giverId: DataTypes.INTEGER,
      addressId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      amount: DataTypes.STRING,
      statusType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
