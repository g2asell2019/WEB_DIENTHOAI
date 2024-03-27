import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import orderController from "../controllers/ordersController";
import brandController from "../controllers/brandController";
import SaleController from "../controllers/saleController";
import CartController from "../controllers/cartController";
import OrderdetailController from "../controllers/orderdetailController";

let router = express.Router();

let initWebRouters = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  //api Users
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateUser);
  router.put("/api/edit-user", userController.handleUpdateUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.handleGetAllCodes);

  //api Products
  router.get("/api/get-all-products", productController.handleGetAllProducts);
  router.get("/api/get-detail-product", productController.handleDetailProduct);
  router.post(
    "/api/create-new-products",
    productController.handleCreateProduct
  );
  router.put("/api/edit-products", productController.handleEditProduct);
  router.delete("/api/delete-products", productController.handleDeleteProduct);

  //api Carts
  router.post("/api/create-new-cart", CartController.handleCreateCart);
  router.delete("/api/delete-cart", CartController.handleDeleteCart);
  router.put("/api/edit-cart", CartController.handleEditCart);
  router.get("/api/get-all-cart", CartController.handlegetAllCart);

  //api Orderdetails
  router.post(
    "/api/create-new-Orderdetail",
    OrderdetailController.handleCreateOderdetail
  );
  router.delete(
    "/api/delete-Orderdetail",
    OrderdetailController.handleDeleteOderdetail
  );
  router.put(
    "/api/edit-Orderdetail",
    OrderdetailController.handleEditOderdetail
  );
  router.get(
    "/api/get-all-Orderdetail",
    OrderdetailController.handlegetAllOderdetail
  );
  router.get("/api/get-lay-hoa-don", OrderdetailController.handleLayhoadon);

  //api Brands
  router.post("/api/create-new-brand", brandController.handleCreateBrand);
  router.delete("/api/delete-brand", brandController.handleDeleteBrand);
  router.put("/api/edit-brand", brandController.handleEditBrand);
  router.get("/api/get-all-brand", brandController.handleGetAllBrand);

  // api Sales
  router.post("/api/create-new-sale", SaleController.handleCreateSale);
  router.delete("/api/delete-sale", SaleController.handleDeleteSale);
  router.put("/api/edit-sale", SaleController.handleEditSale);
  router.get("/api/get-all-sale", SaleController.handlegetAllSale);

  //api Categories
  router.post(
    "/api/create-new-categories",
    productController.handleCreateCategory
  );
  router.delete(
    "/api/delete-categories",
    productController.handleDeleteCategory
  );
  router.put("/api/edit-categories", productController.handleEditCategory);
  router.get(
    "/api/get-all-categories",
    productController.handlegetAllCategories
  );

  //api Orders
  router.get("/api/get-all-orders", orderController.handleGetAllOrders);
  router.post("/api/create-new-orders", orderController.handleCreateOrders);
  router.delete("/api/delete-orders", orderController.handleDeleteOrders);
  router.put("/api/edit-orders", orderController.handleEditOder);
  router.get("/api/loc-don-hang", orderController.handleLocdonhang);

  return app.use("/", router);
};
module.exports = initWebRouters;
