import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import user from "../../../public/images/search/user.png";
export const Profile = () => {
  return (
    <>
      <div className="background">
        <div className="profile_container  product">
          <h1>Thông tin cá nhân</h1>
          <div className="d_flex profile_main">
            <div className="profile-left">
              <img src={user} alt="" />
              <a href="./ProfileUpdate">Cập nhật Thông tin cá nhân</a>
            </div>
            <div className="profile-right ">
              <div className="d_flex profile_item">
                <h3>Tên tài khoản: </h3>
                <p> ABC</p>
              </div>

              <div className="d_flex profile_item">
                <h3>Họ tên: </h3>
                <p> ABC</p>
              </div>

              <div className="d_flex profile_item">
                <h3>Số điện thoại: </h3>
                <p> 0999999999</p>
              </div>

              <div className="d_flex profile_item">
                <h3>Email: </h3>
                <p> ABC@example.com </p>
              </div>

              <div className="d_flex profile_item">
                <h3>Địa chỉ: </h3>
                <p> 123 Hồng Bàng </p>
              </div>

              <a href="">
                <span>Đơn đặt hàng</span>
              </a>
              <a href="./ChangePassword">
                <span>Thay đổi mật khẩu </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
