const { Sequelize } = require('sequelize');



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('fx3f09hng2ji_db_dienthoai', 'fx3f09hng2ji_nhom6', 'nhom6@123456789', {
    host: '137.59.106.55',
    dialect: 'mysql',
    logging: false
});

let connectDB = async() => {

    // kiểm tra kết nối DB thành công hay không 
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}
module.exports = connectDB;