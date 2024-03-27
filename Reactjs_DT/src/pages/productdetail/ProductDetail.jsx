import React, { useState, useEffect } from "react";
import { getDeltaiProduct, CreateCart } from "../../userService";
import { Buffer } from "buffer";
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { handleAddCart } from "../../utils/handleAddCart";
import { themvaogiohang } from "../../utils/themvaogiohang";
import { formatCurrency } from "../../utils/formatCurrency.js";
export const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [user, setUser] = useState({ taikhoan: "" });

  const [detailProducts, setdetailProducts] = useState({});
  let imageBase64 = "";
  if (detailProducts.image) {
    imageBase64 = Buffer.from(detailProducts.image, "base64").toString(
      "binary"
    );
  }

  

  useEffect(() => {
    // Sử dụng một hàm async để lấy dữ liệu từ Local Storage
    const getUserDataFromLocalStorage = async () => {
      const userData = localStorage.getItem("user");

      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    };

    getUserDataFromLocalStorage(); // Gọi hàm để lấy dữ liệu từ Local Storage
    getAllUserFromReact();
  }, []);

  const getAllUserFromReact = async () => {
    let response = await getDeltaiProduct(id);
    if (response && response.errcode === 0) {
      setdetailProducts(response.products);
    }
  };

  {
    user && <ProductDetail />;
  }
  // {product.cover}
  return (
    <>
      <div className="wrapper-pd">
        <div className="product mtop d_flex">
          <div className="img-pd">
            <span className="discount">{}% Off</span>
            <img src={imageBase64} alt="" />
          </div>
          <div className="product-info">
            <h2>{detailProducts.name}</h2>
            <div className="rate">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
            <div className="desc">
              <p>{detailProducts.name}</p>
            </div>
            <div className="price-pd">
              <h4>{formatCurrency(detailProducts.price)}</h4>
            </div>
            <button
              onClick={
                user && user.id
                  ? () => handleAddCart(detailProducts)
                  : () => addToCart(detailProducts)
              }
            >
              <i className="fa-solid fa-cart-plus"></i>
              <span> Mua ngay</span>
            </button>
          </div>
        </div>
      </div>
      <div className="wrapper-ap">
        <h2>Đánh giá sản phẩm</h2>
        <hr />
        <div className="product mtop d_flex">
          <div>
            <div className="pd-item username">Username</div>
            <div className="rate pd-item">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
          </div>
          <div className="pd-item">Comments</div>
        </div>
      </div>
    </>
  );
};
