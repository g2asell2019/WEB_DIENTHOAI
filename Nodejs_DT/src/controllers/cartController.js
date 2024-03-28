import Cartservices from "../services/CartServices";

class CartServices {
  constructor() {
    if (!CartServices.instance) {
      this._data = null;
      CartServices.instance = this;
    }
    return CartServices.instance;
  }

  async handlegetAllCart(req, res) {
    let id = req.query.id; //all, id
    if (!id) {
      return res.status(200).json({
        errcode: 1,
        errMessage: "Missing require parameters",
        products: [],
      });
    }
    let Cart = await Cartservices.getAllCart(id);
    return res.status(200).json({
      errcode: 0,
      errMessage: "OK",
      Cart,
    });
  }

  async handleCreateCart(req, res) {
    let message = await Cartservices.CreateCart(req.body);
    return res.status(200).json(message);
  }

  async handleDeleteCart(req, res) {
    if (!req.body.id) {
      return res.status(200).json({
        errcode: 1,
        errMessage: "Missing required parameters !",
      });
    }
    let message = await Cartservices.deleteCart(req.body.id);
    return res.status(200).json(message);
  }

  async handleEditCart(req, res) {
    let data = req.body;
    let message = await Cartservices.updateCartData(data);
    return res.status(200).json(message);
  }
}

const singletonInstance = new CartServices();
Object.freeze(singletonInstance);

export default singletonInstance;
