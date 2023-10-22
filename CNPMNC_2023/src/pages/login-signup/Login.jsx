import React from "react";
import "./LoginSignup.css";
import { Link } from "react-router-dom";
export const Login = () => {
  return (
    <>
      <div className="loginsignup">
        <div className="login-container">
          <h1>Đăng nhập</h1>
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
          <button type="submit" id="" name="button">
            Đăng nhập
          </button>
          <p className="loginsignup-signup">
            Chưa có tài khoản?
            <Link to={"./Signup"}>
              <span> Đăng ký ngay</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
