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
            Products.belongsTo(models.Brands, { foreignKey: 'idBrand', targetKey: 'id', as: 'idBrandData' })
            Products.belongsTo(models.Discount, { foreignKey: 'idDiscount', targetKey: 'id', as: 'idDiscountData' })
            Products.belongsTo(models.Sales, { foreignKey: 'idSale', targetKey: 'id', as: 'idSaleData' })

            Products.hasMany(models.OrderDetails, { foreignKey: 'product_id', as: 'idProductData' })


        }
    };
    Products.init({
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        quantity: DataTypes.STRING,
        image: DataTypes.TEXT,
        idCate: DataTypes.INTEGER,
        idBrand: DataTypes.INTEGER,
        idDiscount: DataTypes.INTEGER,
        idSale: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Products',
    });
    return Products;
};