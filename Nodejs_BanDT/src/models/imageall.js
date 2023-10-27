'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageAll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        ImageAll.belongsTo(models.Products,{foreignKey:'idPro'})
 
    }
  };
  ImageAll.init({
    image:DataTypes.TEXT,
    idPro:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ImageAll',
  });
  return ImageAll;
};