'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class News extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    News.init({
            title: DataTypes.STRING,
            avatar: DataTypes.BLOB('long'),
            contentHTML: DataTypes.TEXT('long'),
            contentMarkdown: DataTypes.TEXT('long'),
            description: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'News',
    });
    return News;
};