import productServices from "../services/productServices";

let handleGetAllProducts = async (req, res) => {
  let id = req.query.id;
  let idCate = req.query.idCate;
  let idBrand = req.query.idBrand;
  let price = req.query.price;
  let orderBy = req.query.orderBy;
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let products = await productServices.getAllProducts(
    id,
    idCate,
    idBrand,
    price,
    orderBy
  );
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    products,
  });
};

let handleDetailProduct = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let products = await productServices.getProductDetail(id);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    products,
  });
};

let handleCreateProduct = async (req, res) => {
  let message = await productServices.createProduct(req.body);
  return res.status(200).json(message);
};

let handleDeleteProduct = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await productServices.deleteProduct(req.body.id);
  return res.status(200).json(message);
};

let handleEditProduct = async (req, res) => {
  let data = req.body;
  let message = await productServices.updateProduct(data);
  return res.status(200).json(message);
};

// Category
let handlegetAllCategories = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let categories = await productServices.getAllCategories(id);
  console.log(categories);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    categories,
  });
};

let handleCreateCategory = async (req, res) => {
  let message = await productServices.createCategory(req.body);
  return res.status(200).json(message);
};

let handleDeleteCategory = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await productServices.deleteCategory(req.body.id);
  return res.status(200).json(message);
};

let handleEditCategory = async (req, res) => {
  let data = req.body;
  let message = await productServices.updateCategory(data);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllProducts: handleGetAllProducts,
  handleCreateProduct: handleCreateProduct,
  handleDeleteProduct: handleDeleteProduct,
  handleEditProduct: handleEditProduct,
  handlegetAllCategories: handlegetAllCategories,
  handleCreateCategory: handleCreateCategory,
  handleDeleteCategory: handleDeleteCategory,
  handleEditCategory: handleEditCategory,
  handleDetailProduct: handleDetailProduct,
};
