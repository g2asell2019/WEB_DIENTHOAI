import db from "../models/index";




let CreateOrderDetails = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
        
        
                await db.OrderDetails.create({
                    order_id: data.order_id,
                    product_id: data.product_id,
                    quantity: data.quantity,
                    total_price: data,total_price,

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