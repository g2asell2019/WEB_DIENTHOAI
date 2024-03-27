import db from "../models/index";
import { Op } from "sequelize";

const getAllProducts = (productId, cateId, idbrand, priceRange, orderBy) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryConditions = {};

      if (productId !== "ALL") {
        queryConditions.id = productId;
      }

      if (cateId) {
        queryConditions.idCate = cateId;
      }
      if (idbrand) {
        queryConditions.idBrand = idbrand;
      }

      if (priceRange && priceRange !== "") {
        const [minPrice, maxPrice] = priceRange.split("-").map(parseFloat);
        queryConditions.price = {
          [Op.between]: [minPrice, maxPrice],
        };
      }

      let orderCondition = [];
      if (orderBy === "price-asc") {
        orderCondition.push(["price", "ASC"]);
      } else if (orderBy === "price-desc") {
        orderCondition.push(["price", "DESC"]);
      } else {
        orderCondition.push(["createdAt", "DESC"]);
      }

      let products = await db.Products.findAll({
        where: queryConditions,
        order: orderCondition,
        include: [
          {
            model: db.Categories,
            as: "idCateData",
            attributes: ["name"],
          },
          {
            model: db.Brands,
            as: "idBrandData",
            attributes: ["name"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

let getProductDetail = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = null;

      if (productId && productId !== "ALL") {
        product = await db.Products.findOne({
          where: { id: productId },
          include: [
            {
              model: db.Categories,
              as: "idCateData",
              attributes: ["name"],
            },
            {
              model: db.Brands,
              as: "idBrandData",
              attributes: ["name"],
            },
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(product);
    } catch (e) {
      reject(e);
    }
  });
};

const checkProductName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Products.findOne({
        where: { name: name },
      });
      resolve(!!product);
    } catch (e) {
      reject(e);
    }
  });
};

const createProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isProductNameExist = await checkProductName(data.name);
      if (isProductNameExist) {
        resolve({
          errCode: 1,
          errMessage: "Product name already exists",
        });
      } else {
        if (!data) {
          data = {};
        }
        await db.Products.create({
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          image: data.avatar,
          idCate: data.idCate,
          idBrand: data.idBrand,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          message: "Product created successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Products.findOne({ where: { id: productId } });
      if (!product) {
        resolve({
          errCode: 1,
          errMessage: "Product doesn't exist",
        });
      } else {
        await db.Products.destroy({ where: { id: productId } });
        resolve({ errCode: 0, message: "Product deleted successfully" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Products.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (!product) {
        resolve({
          errCode: 1,
          errMessage: "Product not found",
        });
      } else {
        product.set(data);
        await product.save();
        resolve({ errCode: 0, message: "Product updated successfully" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkCategoryName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await db.Categories.findOne({
        where: { name: name },
      });
      if (category) {
        resolve(true);
      }
      resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};

let checkBrandName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let brands = await db.Brands.findOne({
        where: { name: name },
      });
      if (brands) {
        resolve(true);
      }
      resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};

let createCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkCName = await checkCategoryName(data.name);
      let checkBName = await checkBrandName(data.name);
      if (checkCName == true) {
        resolve({
          errCode: 1,
          errMessage: "Tên loại sản phẩm này đã tồn tại",
        });
      } else if (checkBName == true) {
        resolve({
          errCode: 1,
          errMessage: "Tên hãng sản phẩm này đã tồn tại",
        });
      } else {
        await db.Categories.create({
          name: data.name,
          image: data.avatar,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
          message: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCategory = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.Categories.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      resolve({
        errCode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.Categories.destroy({
      where: { id: categoryId },
    });
    resolve({
      errCode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      }
      let category = await db.Categories.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!category) {
        resolve({
          errCode: 2,
          errMessage: "categories not found !",
        });
      }

      category.name = data.name;
      if (data.avatar) {
        category.image = data.avatar;
      }
      await category.save();
      resolve({
        errCode: 0,
        errMessage: "update categories succeeds !",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCategories = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = "";

      if (categoryId && categoryId !== "ALL") {
        categories = await db.Categories.findOne({
          where: { id: categoryId },
        });
      }

      categories = db.Categories.findAll({
        order: [["createdAt", "ASC"]],
      });

      resolve(categories);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductDetail: getProductDetail,
  createProduct: createProduct,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct,
  createCategory: createCategory,
  deleteCategory: deleteCategory,
  getAllCategories: getAllCategories,
  updateCategory: updateCategory,
};
