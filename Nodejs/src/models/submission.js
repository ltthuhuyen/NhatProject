"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    static associate(models) {
      Submission.belongsTo(models.Competition, {
        foreignKey: "competitionId",
        targetKey: "id",
        as: "competitionData",
      });
      Submission.belongsTo(models.User, {
        foreignKey: "participantId",
        targetKey: "id",
        as: "participantData",
      });
      Submission.hasMany(models.Appreciate, {
        foreignKey: "submissId",
        as: "submissionData",
      });
    }
  }
  Submission.init(
    {
      competitionId: DataTypes.INTEGER,
      participantId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      avatar: DataTypes.BLOB("long"),
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
      description: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
