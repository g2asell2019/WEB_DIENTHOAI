import React from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";
export const Order = () => {
  return (
    <>
      <div className="order">
        <div className="container-o">
          <h1>Điền thông tin đơn đặt hàng</h1>
          <div className="input-data">
            <input type="text" id="name" required />
            <div className="underline"></div>
            <label>Họ và tên </label>
          </div>
          <div className="input-data">
            <input type="number" id="name" required />
            <div className="underline"></div>
            <label>Số điện thoại </label>
          </div>
          <div class="input-data">
            <input type="text" id="text" required />
            <div className="underline"></div>
            <label>Địa Chỉ Giao Hàng</label>
          </div>
          <div class="input-data">
            <select name="" id="">
              <option value="1">Thanh toán bằng tiền mặt</option>
              <option value="2">Thanh toán bằng thẻ ngân hàng</option>
            </select>
          </div>
          <button type="submit">Tiếp tục</button>
        </div>
      </div>
    </>
  );
};
