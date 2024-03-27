import OrderServices from "../services/OrderServices"

// Xác định các trạng thái
class OrderState {
    constructor(order) {
        this.order = order;
    }
    handle() {} // Abstract method for handling state-specific actions
}
//Tạo Interface hoặc Abstract Class cho State: 
class PendingState extends OrderState {
    handle() {
        // Perform actions specific to pending state
        return OrderServices.getAllOrders(this.order.id);
    }
}

class ConfirmedState extends OrderState {
    handle() {
        // Perform actions specific to confirmed state
        return OrderServices.locdonhang(this.order.id, this.order.createdAt, this.order.order_status);
    }
}


class Order {
    constructor(id, createdAt, order_status) {
        this.id = id;
        this.createdAt = createdAt;
        this.order_status = order_status;
        this.state = null; // Initial state is null
    }

    setState(state) {
        this.state = state;
    }

    async handleState() {
        if (!this.state) {
            throw new Error("State not set");
        }
        return this.state.handle();
    }
}
let handleGetAllOrders = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            orders: []
        });
    }
    try {
        const order = new Order(id);
        order.setState(new PendingState(order));
        const orders = await order.handleState();
        return res.status(200).json({
            errcode: 0,
            errMessage: 'OK',
            orders
        });
    } catch (error) {
        return res.status(500).json({
            errcode: 1,
            errMessage: "Internal server error",
        });
    }
};

let handleLocdonhang = async(req, res) => {
    let id = req.query.id; //all, id
    let createdAt=req.query.createdAt;
    let order_status=req.query.order_status;
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            orders: []
        });
    }
    try {
        const order = new Order(id, createdAt, order_status);
        order.setState(new ConfirmedState(order));
        const orders = await order.handleState();
        return res.status(200).json({
            errcode: 0,
            errMessage: 'OK',
            orders
        });
    } catch (error) {
        return res.status(500).json({
            errcode: 1,
            errMessage: "Internal server error",
        });
    }
};













let handleCreateOrders = async(req, res) => {
    let message = await OrderServices.CreateOrders(req.body);
    console.log(message);
    return res.status(200).json(message);

}




let handleDeleteOrders = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let message = await OrderServices.deleteOrders(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}



let handleEditOder = async(req, res) => {
    let data = req.body;
    let message = await OrderServices.updateOrderData(data);
    return res.status(200).json(message)

}










module.exports = {
    handleGetAllOrders: handleGetAllOrders,
    handleCreateOrders: handleCreateOrders,
    handleDeleteOrders: handleDeleteOrders,
    handleEditOder:handleEditOder,
    handleLocdonhang:handleLocdonhang
 





}