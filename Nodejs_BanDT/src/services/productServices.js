import categories from "../models/categories";
import db from "../models/index";
let getAllProducts = (productId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let products = '';
            if (productId == 'ALL') {
                products = db.Products.findAll({
                    order: [
                        ["createdAt", "DESC"]
                    ],
                    include: [{
                        model: db.Categories, // Tham chiếu đến bảng Categories
                        as: 'idCateData',
                        attributes: ['name'] // Tên alias của quan hệ (nếu đã được đặt)
                    }, ],
                    raw: true,
                    nest: true,

                })


            }

            if (productId && productId !== 'ALL') {
                products = await db.Products.findOne({
                    where: { id: productId }, //  productId laf cais tham so truyen vao

                    include: [{
                        model: db.Categories, // Tham chiếu đến bảng Categories
                        as: 'idCateData',
                        attributes: ['name'] // Tên alias của quan hệ (nếu đã được đặt)
                    }, ],
                    raw: true,
                    nest: true,
                });

            }
            resolve(products)
        } catch (e) {
            reject(e);
        }
    })

}
let checkproductname = (name) => {
    return new Promise(async(resolve, reject) => {
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
    })
}

let CreateProducts = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // check taikhoan is exist??
            let check = await checkproductname(data.name);
            if (check == true) {
                resolve({
                    errcode: 1,
                    errMessage: "Tên người dùng đã tồn tại vui lòng nhập tên người dùng  khác"
                })
            } else {
                await db.Products.create({
                    name: data.name,
                    price: data.price,
                    quantity: data.quantity,
                    image: data.avatar,
                    idCate: data.idCate
                });
                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');

                }
                if (!data) {
                    data = {};
                }
                resolve({
                    errcode: 0,
                    data: data
                })

                resolve({
                    errcode: 0,
                    message: 'OK'
                })
            }



        } catch (e) {
            reject(e);

        }
    })
}
let deleteProducts = (productId) => {
    return new Promise(async(resolve, reject) => {
        let products = await db.Products.findOne({
            where: { id: productId }
        })
        if (!products) {
            resolve({
                errcode: 2,
                errMessage: "product isn't exist !"
            })
        }
        await db.Products.destroy({
            where: { id: productId }
        });
        resolve({
            errcode: 0,
            errMessage: "product is deleted !"

        });
    })
}
let updateProductData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {

            if (!data.id || !data.name) {
                resolve({
                    errcode: 2,
                    errMessage: "Missing required parameter"
                })
            }
            let products = await db.Products.findOne({
                where: { id: data.id },
                raw: false
            })
            if (products) {
                products.name = data.name;
                products.price = data.price;
                products.quantity = data.quantity;
                products.idCate = data.idCate;
                if (data.avatar) {
                    products.image = data.avatar;

                }

                products.image = data.avatar;
                await products.save();
                resolve({
                    errcode: 0,
                    errMessage: "update product succeeds !"
                });
            } else {
                resolve({
                    errcode: 1,
                    errMessage: "product not found !"
                });
            }
        } catch (e) {
            reject(e)

        }
    })
}





let checkcategoriesname = (name) => {
    return new Promise(async(resolve, reject) => {
        try {
            let category = await db.Categories.findOne({

                where: { name: name },

            });
            if (category) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (e) {
            reject(e);

        }
    })
}





let CreateCategories = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // check taikhoan is exist??
            let check = await checkcategoriesname(data.name);
            if (check == true) {
                resolve({
                    errcode: 1,
                    errMessage: "Tên loại sản phẩm này đã tồn tại"
                })
            } else {
                await db.Categories.create({
                    name: data.name,
                    keyMap: data.keyMap
                });
                resolve({
                    errcode: 0,
                    data: data
                })

                resolve({
                    errcode: 0,
                    message: 'OK'
                })
            }



        } catch (e) {
            reject(e);

        }
    })
}
let deleteCategories = (CategoriesId) => {
    return new Promise(async(resolve, reject) => {
        let category = await db.Categories.findOne({
            where: { id: CategoriesId }
        })
        if (!category) {
            resolve({
                errcode: 2,
                errMessage: "loại sản phẩm  không tồn tại"
            })
        }
        await db.Categories.destroy({
            where: { id: CategoriesId }
        });
        resolve({
            errcode: 0,
            errMessage: "loại sản phẩm đã bị xóa !"

        });
    })
}




let updateCategoriesData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errcode: 2,
                    errMessage: "Missing required parameter"
                })
            }
            let categories = await db.Categories.findOne({
                where: { id: data.id },
                raw: false
            })
            if (categories) {
                categories.name = data.name;



                await categories.save();
                resolve({
                    errcode: 0,
                    errMessage: "update categories succeeds !"
                });
            } else {
                resolve({
                    errcode: 1,
                    errMessage: "categories not found !"
                });
            }
        } catch (e) {
            reject(e)

        }
    })
}


let getAllCategories = (categoriesId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let categories = '';
            if (categoriesId == 'ALL') {
                categories = db.Categories.findAll({
                    order: [
                        ["createdAt", "DESC"]
                    ],
                })

            }
            if (categoriesId && categoriesId !== 'ALL') {
                categories = await db.Categories.findOne({
                    where: { id: categoriesId }, //  productId laf cais tham so truyen vao
                });

            }
            resolve(categories)
        } catch (e) {
            reject(e);
        }
    })

}









module.exports = {
    getAllProducts: getAllProducts,
    CreateProducts: CreateProducts,
    deleteProducts: deleteProducts,
    updateProductData: updateProductData,
    CreateCategories: CreateCategories,
    deleteCategories: deleteCategories,
    getAllCategories: getAllCategories,
    updateCategoriesData: updateCategoriesData

}