import React from "react";
import "./LoginSignup.css";
import { Link } from "react-router-dom";

export const Signup = () => {
  return (
    <>
      <div className="loginsignup">
        <div className="signup-container">
          <h1>Đăng ký</h1>
          <div className="input-data">
            <input type="text" required />
            <div className="underline"></div>
            <label>Tài khoản </label>
          </div>
          <div className="input-data">
            <input type="password" required />
            <div className="underline"></div>
            <label>Mật khẩu </label>
          </div>
          <div className="input-data">
            <input type="password" required />
            <div className="underline"></div>
            <label>Nhập lại Mật khẩu </label>
          </div>
          <div className="input-data">
            <input type="text" required />
            <div className="underline"></div>
            <label>Họ và tên </label>
          </div>
          <div className="input-data">
            <input type="text" required />
            <div className="underline"></div>
            <label>Số điện thoại </label>
          </div>
          <div className="input-data">
            <input type="text" required />
            <div className="underline"></div>
            <label>Email </label>
          </div>
          <div className="input-data">
            <input type="text" required />
            <div className="underline"></div>
            <label>Địa chỉ </label>
          </div>
          <button type="submit" id="" name="button">
            Đăng ký
          </button>
          <p className="loginsignup-signup">
            Đã có tài khoản?
            <Link to={"./Login"}>
              <span> Đăng nhập </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
