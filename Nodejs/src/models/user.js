"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.belongsTo(models.Allcode, {
        foreignKey: "roleId",
        targetKey: "keyMap",
        as: "roleIdData",
      });
      User.belongsTo(models.Allcode, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderData",
      });
      User.hasMany(models.Schedule, { foreignKey: "giverId", as: "giverData" });
      User.hasMany(models.Collectionform, {
        foreignKey: "recipientId",
        as: "recipientData",
      });
      User.hasMany(models.Temp, { foreignKey: "giverId", as: "giverTemp" });
      User.hasMany(models.Address, { foreignKey: "userId", as: "userData" });
      User.hasOne(models.Submission, {
        foreignKey: "participantId",
        targetKey: "id",
        as: "participantData",
      });
      User.hasMany(models.Appreciate, {
        foreignKey: "reviewerId",
        as: "reviewerData",
      });

      // User.hasMany(models.Temp, { foreignKey: 'recipientId', as: 'recipientTemp' })
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      // typeRole: DataTypes.STRING,
      // keyRole: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
