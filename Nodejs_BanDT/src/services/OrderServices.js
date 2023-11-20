import db from "../models/index";
const { Sequelize, Op } = require('sequelize');




let getAllOders = (orderId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let orders = '';

            if (orderId == 'ALL') {
                orders = db.Orders.findAll({
                    order: [
                        ["createdAt", "DESC"]
                    ],
                });
            } else if (orderId && orderId !== 'ALL') {
                orders = await db.Orders.findOne({
                    where: { id: orderId },

                });
            }



            resolve(orders);
        } catch (e) {
            reject(e);
        }
    });
};




let CreateOrders = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm đơn hàng mới nhất để xác định ID tiếp theo
            const latestOrder = await db.Orders.findOne({
                order: [["createdAt", "DESC"]],
            });

            let nextOrderId;
            if (latestOrder) {
                const latestOrderIdNumber = parseInt(latestOrder.id_order.substr(2), 10);
                nextOrderId = `HD${(latestOrderIdNumber + 1).toString().padStart(2, '0')}`;
            } else {
                // Nếu không có đơn hàng trước đó, bắt đầu bằng HD01
                nextOrderId = "HD01";
            }

            // Tạo đơn hàng mới
            await db.Orders.create({
                id_order: nextOrderId,
                receiver: data.receiver,
                order_status: data.order_status,
                receiving_point: data.receiving_point,
                phoneNumber: data.phoneNumber,
                total_value: data.total_value,
                note: data.note,
                payment: data.payment,
                order_idUser: data.order_idUser,
            });

            const productListWithOrderId = data.productList.map((item) => ({
                ...item,
                order_id: nextOrderId,
            }));
            await db.OrderDetails.bulkCreate(productListWithOrderId);

            resolve({
                errcode: 0,
                message: 'OK',
                data: {
                    ...data,
                    id_order: nextOrderId,
                },
                productListWithOrderId:{order_id: nextOrderId}
            });

        } catch (e) {
            reject(e);
        }
    });
};

let deleteOrders = (orderId) => {
    return new Promise(async(resolve, reject) => {
        let orders = await db.Orders.findOne({
            where: { id: orderId }
        })
        if (!orders) {
            resolve({
                errcode: 2,
                errMessage: "orders isn't exist !"
            })
        }
        await db.Orders.destroy({
            where: { id: orderId }
        });
        resolve({
            errcode: 0,
            errMessage: "orders is deleted !"

        });
    })
}












module.exports = {
    getAllOders: getAllOders,
    CreateOrders: CreateOrders,
    deleteOrders: deleteOrders,


}