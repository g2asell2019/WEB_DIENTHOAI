import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

export const Cart = ({ cartItem, addToCart, decreaseQty }) => {
  const totalPrice = cartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  function formatCurrency(number) {
    // Sử dụng Intl.NumberFormat để định dạng số
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // Loại bỏ phần thập phân
    });

    // Lấy chuỗi đã định dạng số
    const formattedNumber = formatter.format(number);

    // Loại bỏ khoảng trắng giữa số và đơn vị tiền tệ (₫)
    return formattedNumber.replace(/\s/g, "");
  }
  return (
    <>
      <section className="cart-items">
        <div className="container title">
          <h1>Giỏ hàng</h1>
        </div>
        <div className="container d_flex">
          <div className="cart-details">
            {cartItem.length == 0 && (
              <h1 className="no-items product">
                Không có sản phẩm nào trong giỏ hàng
              </h1>
            )}
            {cartItem.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list product d_flex">
                  <div className="img">
                    <img src={item.cover} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      {formatCurrency(item.price)} * {item.qty}
                      <span>{formatCurrency(productQty)}</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>

                    <div className="cartControl d_flex">
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fa-solid  fa-minus"></i>
                      </button>
                      <button
                        className="incCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-total product">
            <h2>Tóm tắt giỏ hàng</h2>
            <div className="d_flex">
              <h4>Tổng thanh toán: </h4>
              <h3>{formatCurrency(totalPrice)}</h3>
            </div>
            <Link to={"./Checkout"}>
              <button>Tiến hành đặt hàng</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
