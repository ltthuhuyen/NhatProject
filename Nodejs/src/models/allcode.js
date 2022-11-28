"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      Allcode.hasMany(models.Schedule, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });
      Allcode.hasMany(models.Schedule, {
        foreignKey: "statusType",
        as: "statusData",
      });
      Allcode.hasMany(models.Collectionform, {
        foreignKey: "statusType",
        as: "statusTypeData",
      });
      Allcode.hasMany(models.User, { foreignKey: "roleId", as: "roleIdData" });
      Allcode.hasMany(models.User, { foreignKey: "gender", as: "genderData" });
      Allcode.hasMany(models.Temp, {
        foreignKey: "timeType",
        as: "timeTypeTemp",
      });
      Allcode.hasMany(models.Temp, {
        foreignKey: "statusType",
        as: "statusTypeTemp",
      });
    }
  }
  Allcode.init(
    {
      type: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
