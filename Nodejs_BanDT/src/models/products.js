'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Products.belongsTo(models.Categories, { foreignKey: 'idCate', targetKey: 'id', as: 'idCateData' })

        }
    };
    Products.init({
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        quantity: DataTypes.STRING,
        image: DataTypes.TEXT,
        idCate: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Products',
    });
    return Products;
};