import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import specialtyController from "../controllers/specialtyController";
import productController from "../controllers/productController";
import orderController from "../controllers/ordersController";

let router = express.Router();

let initWebRouters = (app) => {
    router.get('/', homeController.getHomePage); // gọi file controller và 
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD); // link acction

    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    //api cua User
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);



    //api cua san pham
    router.get('/api/get-all-products', productController.handleGetAllProducts);
    router.post('/api/create-new-products', productController.handleCreateProducts);
    router.put('/api/edit-products', productController.handleEditProducts);
    router.delete('/api/delete-products', productController.handleDeleteProducts);

    //api cua categories
    router.post('/api/create-new-categories', productController.handleCreateCategories);
    router.delete('/api/delete-categories', productController.handleDeleteCategories);
    router.put('/api/edit-categories', productController.handleEditCategories);
    router.get('/api/get-all-categories', productController.handlegetAllCategories);


    //api cua orders
    router.get('/api/get-all-orders', orderController.handleGetAllOrders);
    router.post('/api/create-new-orders', orderController.handleCreateOrders);
    router.delete('/api/delete-orders', orderController.handleDeleteOrders);














































































    // api cuar doctor

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-infor-doctors', doctorController.postInfoDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);


    //api cua chuyen khoa 
    router.post('/api/create-new-specialty', specialtyController.createSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);


















    // thêm  trang mới  khi /tanh
    router.get('/tanh', (req, res) => {
        return res.send('Hello world with NTanh');

    });

    return app.use("/", router);
}
module.exports = initWebRouters;