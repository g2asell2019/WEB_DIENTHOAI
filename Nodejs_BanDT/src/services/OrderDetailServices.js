import db from "../models/index";



let checkOrderDetailsname = (name) => {
    return new Promise(async(resolve, reject) => {
        try {
            let OrderDetails = await db.OrderDetails.findOne({

                where: { name: name },

            });
            if (OrderDetails) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (e) {
            reject(e);

        }
    })
}
let CreateOrderDetails = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // check taikhoan is exist??
            let check = await checkOrderDetailsname(data.name);
            if (check == true) {
                resolve({
                    errcode: 1,
                    errMessage: " Sản phẩm này đã tồn tại trong giỏ hàng"
                })
            } else {
                await db.OrderDetails.create({
                    name: data.name,
                    price: data.price,
                    quantity: data.quantity,
                    image: data.image,
                    iduser: data.iduser,
                    idproduct:data.idproduct

                });
              
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
let deleteOrderDetails = (OrderDetailsId) => {
    return new Promise(async(resolve, reject) => {
        let category = await db.OrderDetails.findOne({
            where: { id: OrderDetailsId }
        })
        if (!category) {
            resolve({
                errcode: 2,
                errMessage: " sản phẩm  không tồn tại"
            })
        }
        await db.OrderDetails.destroy({
            where: { id: OrderDetailsId }
        });
        resolve({
            errcode: 0,
            errMessage: " sản phẩm đã bị xóa !"

        });
    })
}




let updateOrderDetailsData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errcode: 2,
                    errMessage: "Missing required parameter"
                })
            }
            let OrderDetails = await db.OrderDetails.findOne({
                where: { id: data.id },
                raw: false
            })
            if (OrderDetails) {
                OrderDetails.quantity=data.quantity;
                await OrderDetails.save();
                resolve({
                    errcode: 0,
                    errMessage: "update OrderDetails succeeds !"
                });
            } else {
                resolve({
                    errcode: 1,
                    errMessage: "OrderDetails not found !"
                });
            }
        } catch (e) {
            reject(e)

        }
    })
}


let getAllOrderDetails = (OrderDetailsId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let OrderDetails = '';
       
                OrderDetails = db.OrderDetails.findAll({
                    where: { iduser: OrderDetailsId }
                })

            resolve(OrderDetails)
        } catch (e) {
            reject(e);
        }
    })

}

module.exports = {
    getAllOrderDetails: getAllOrderDetails,
    CreateOrderDetails: CreateOrderDetails,
    deleteOrderDetails: deleteOrderDetails,
    updateOrderDetailsData: updateOrderDetailsData,

}