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
    return new Promise(async(resolve, reject) => {
        try {
            // check taikhoan is exist??
            await db.Orders.create({
                receiver: data.receiver,
                order_status: data.order_status,
                receiving_point: data.receiving_point,
                phoneNumber: data.phoneNumber,
                total_value: data.total_value,
                order_date:data.order_date,
                note: data.note,
                payment: data.payment,
                order_idUser: data.order_idUser
            });
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