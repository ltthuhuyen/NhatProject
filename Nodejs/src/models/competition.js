'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Competition extends Model {
    
        static associate(models) {
            Competition.hasMany(models.Submission, { foreignKey: 'competitionId', as: 'competitionData' })
        }
    };
    Competition.init({
            title: DataTypes.STRING,
            avatar: DataTypes.BLOB('long'),
            contentHTML: DataTypes.TEXT('long'),
            contentMarkdown: DataTypes.TEXT('long'),
            description: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Competition',
    });
    return Competition;
};