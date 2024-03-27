import productServices from "../services/productServices";

const handleGetAllProducts = async (req, res) => {
  try{
    let { id, idCate, idBrand, price, orderBy } = req.query;
  
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing require parameters",
        products: [],
      });
    }
    const products = await productServices.getAllProducts(
      id,
      idCate,
      idBrand,
      price,
      orderBy
    );
  
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      products,
    });
  }catch(e){
    return res.status(500).json({
      errCode: 500,
      errMessage: e.message || "Internal Server Error",
      products: []
    })
  }
};

const handleDetailProduct = async (req, res) => {
  try{
    const { id } = req.query;

    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing require parameters",
        products: [],
      });
    }

    const product = await productServices.getProductDetail(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      product,
    });
  }catch(e) {
    return res.status(500).json({
      errCode: 500,
      errMessage: e.message || "Internal Server Error",
      product: [],
    });
  }
};

const handleCreateProduct = async (req, res) => {
  try {
    const message = await productServices.createProduct(req.body);
    return res.status(200).json(message);
  } catch (e) {
    return res.status(500).json({
      errCode: 500,
      errMessage: e.message || "Internal Server Error",
    });
  }
};

const handleDeleteProduct = async (req, res) => {
  try{
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters",
      });
    }
    const message = await productServices.deleteProduct(id);
    return res.status(200).json(message);
  }catch (e) {
    return res.status(500).json({
      errCode: 500,
      errMessage: e.message || "Internal Server Error",
    });
  }
};

const handleEditProduct = async (req, res) => {
  try {
    const data = req.body;
    const message = await productServices.updateProduct(data);
    return res.status(200).json(message);
  } catch (e) {
    return res.status(500).json({
      errCode: 500,
      errMessage: e.message || "Internal Server Error",
    });
  }
};

let handlegetAllCategories = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let categories = await productServices.getAllCategories(id);
  console.log(categories);
  return res.status(200).json({
    errCode: 0,
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
      errCode: 1,
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
