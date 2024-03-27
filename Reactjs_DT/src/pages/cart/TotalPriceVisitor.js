import { CartVisitor } from "./CartVisitor";
export class TotalPriceVisitor extends CartVisitor {
  constructor() {
    super();
    this.totalPrice = 0;
  }

  visitCartItem(cartItem) {
    this.totalPrice += cartItem.price * cartItem.quantity;
  }
}
