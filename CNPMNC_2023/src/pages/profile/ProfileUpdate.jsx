import React from "react";

export const ProfileUpdate = () => {
  return (
    <>
      <div className="background">
        <div className="product profileUpdate_container ">
          <h1>Cập nhật thông tin cá nhân</h1>
          <div className="profileUpdate_main">
            <div className="input-data">
              <input type="text" required />
              <div className="underline"></div>
              <label>Họ tên </label>
            </div>
            <div className="input-data">
              <input type="text" required />
              <div className="underline"></div>
              <label>Số điện thoại </label>
            </div>
            <div className="input-data">
              <input type="text" required />
              <div className="underline"></div>
              <label>Địa chỉ </label>
            </div>
            <button type="submit" id="" name="button">
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
