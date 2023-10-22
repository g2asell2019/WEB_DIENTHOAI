import React from "react";
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
export const ProductDetail = ({ addToCart, productItems, decreaseQty }) => {
  //Chuyển đổi tiền tệ
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

  const { id } = useParams();

  const product = productItems.find((item) => item.id == id);

  const { discount, cover, description, name, price } = product;
  // {product.cover}
  return (
    <>
      <div className="wrapper-pd">
        <div className="product mtop d_flex">
          <div className="img-pd">
            <span className="discount">{discount}% Off</span>
            <img src={cover} alt={name} />
          </div>
          <div className="product-info">
            <h2>{name}</h2>
            <div className="rate">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
            <div className="desc">
              <p>{description}</p>
            </div>
            <div className="price-pd">
              <h4>{formatCurrency(price)}</h4>
            </div>
            <button onClick={() => addToCart(product)}>
              <i class="fa-solid fa-cart-plus"></i>
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
