"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appreciate extends Model {
    static associate(models) {
      Appreciate.belongsTo(models.Submission, {
        foreignKey: "submissionId",
        targetKey: "id",
        as: "submissionData",
      });
      Appreciate.belongsTo(models.User, {
        foreignKey: "reviewerId",
        targetKey: "id",
        as: "reviewerData",
      });
    }
  }
  Appreciate.init(
    {
      submissionId: DataTypes.INTEGER,
      reviewerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Appreciate",
    }
  );
  return Appreciate;
};
