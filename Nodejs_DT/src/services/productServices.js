import categories from "../models/categories";
import db from "../models/index";
const { Sequelize, Op } = require("sequelize");

let getAllProducts = (productId, cateId, idbrand, priceRange, orderBy) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = "";

      let queryConditions = {};

      if (productId && productId !== "ALL") {
        queryConditions.id = productId;
      }

      if (cateId && cateId !== "") {
        queryConditions.idCate = cateId;
      }
      if (idbrand && idbrand !== "") {
        queryConditions.idBrand = idbrand;
      }

      if (priceRange && priceRange !== "") {
        const [minPrice, maxPrice] = priceRange
          .split("-")
          .map((price) => parseFloat(price));
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

      products = await db.Products.findAll({
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
      let products = "";

      if (productId && productId !== "ALL") {
        products = await db.Products.findOne({
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
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

let checkProductName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Products.findOne({
        where: { name: name },
      });
      if (products) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkProductName(data.name);
      if (check == true) {
        resolve({
          errcode: 1,
          errMessage: "Tên sản phẩm đã tồn tại",
        });
      } else {
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
        if (!data) {
          data = {};
        }
        resolve({
          errcode: 0,
          data: data,
          message: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    let product = await db.Products.findOne({
      where: { id: productId },
    });
    if (!product) {
      resolve({
        errcode: 1,
        errMessage: "Product Id isn't exist !",
      });
    }
    await db.Products.destroy({
      where: { id: productId },
    });
    resolve({
      errcode: 0,
      errMessage: "Product is deleted !",
    });
  });
};

let updateProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.name) {
        resolve({
          errcode: 1,
          errMessage: "Missing required parameter",
        });
      }
      let products = await db.Products.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (!products) {
        resolve({
          errcode: 2,
          errMessage: "product not found !",
        });
      }
        
      products.name = data.name;
      products.price = data.price;
      products.quantity = data.quantity;
      products.idCate = data.idCate;
      products.idBrand = data.idBrand;
      if (data.avatar) {
        products.image = data.avatar;
      }
      await products.save();
      resolve({
        errcode: 0,
        errMessage: "update product success !",
      });
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
          errcode: 1,
          errMessage: "Tên loại sản phẩm này đã tồn tại",
        });
      } else if (checkBName == true) {
        resolve({
          errcode: 1,
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
          errcode: 0,
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
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.Categories.destroy({
      where: { id: categoryId },
    });
    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 1,
          errMessage: "Missing required parameter",
        });
      }
      let category = await db.Categories.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!category) {
        resolve({
          errcode: 2,
          errMessage: "categories not found !",
        });
      }

      category.name = data.name;
      if (data.avatar) {
        category.image = data.avatar;
      }
      await category.save();
      resolve({
        errcode: 0,
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
