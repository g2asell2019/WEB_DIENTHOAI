import React from "react";
import { Link,useHistory,Redirect } from "react-router-dom";
export const DashBoard = () => {
  const history = useHistory();

  const handleManageUser=()=>{
    history.replace("/admin/User"); // Sử dụng replace thay vì push
  }
  const handleManageProduct=()=>{
    history.replace("/admin/product"); // Sử dụng replace thay vì push
  }

  const handleManageCategories=()=>{
    history.replace("/admin/categories"); // Sử dụng replace thay vì push
  }
  return (
    <>
      <div className="sidebar">
          <div className="logo"></div>
          <ul className="menu">
            <li className="active">
            
                <i className="fa-solid fa-house"></i>
                <span>Trang chủ </span>
           
            </li>
            <li
                   onClick={()=>handleManageUser()}
            >
             
                <i className="fas fa-user"></i>
                <span>Quản lý  Tài khoản </span>
           
            </li>
            <li
            onClick={()=>handleManageProduct()}
            >
            
              <i className="fas fa-mobile-alt"></i>
                <span>Quản lý  Sản phẩm </span>
            
            </li>

            <li
            onClick={()=>handleManageCategories()}
            >
            
              <i className="fas fa-mobile-alt"></i>
                <span>Quản lý Loại sản phẩm</span>
            
            </li>
            <li className="logout">
             
                <i className="fas fa-sign-out-alt"></i>
                <span>Đăng xuất</span>
              
            </li>
          </ul>
        </div>
    </>
  );
};
