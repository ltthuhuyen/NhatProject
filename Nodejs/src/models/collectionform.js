"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collectionform extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collectionform.belongsTo(models.Schedule, {
        foreignKey: "scheduleId",
        targetKey: "id",
        as: "scheduleData",
      });
      Collectionform.belongsTo(models.User, {
        foreignKey: "recipientId",
        targetKey: "id",
        as: "recipientData",
      });
      Collectionform.belongsTo(models.Allcode, {
        foreignKey: "statusType",
        targetKey: "keyMap",
        as: "statusTypeData",
      });
    }
  }
  Collectionform.init(
    {
      scheduleId: DataTypes.STRING,
      recipientId: DataTypes.STRING,
      registerDate: DataTypes.DATE,
      receivedDate: DataTypes.DATE,
      recipientId: DataTypes.INTEGER,
      statusType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Collectionform",
    }
  );
  return Collectionform;
};
