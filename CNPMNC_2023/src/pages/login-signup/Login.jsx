import React, { useState } from 'react';
import "./LoginSignup.scss";
import { Link } from "react-router-dom";
export const Login = () => {





  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };
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
            <input  type={isShowPassword ? 'text' : 'password'} required />
            <span onClick={handleShowHidePassword}>
    <i className={isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
  </span> 
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
