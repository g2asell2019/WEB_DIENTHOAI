import React, { useState, useEffect } from "react";
import { getDeltaiProduct} from "../../userService";
import { Buffer } from "buffer";
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
export const ProductDetail = ({ addToCart }) => {
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
  
  const [detailProducts, setdetailProducts] = useState({});
 

  useEffect(() => {
    getAllUserFromReact();
  }, []);


  
  const getAllUserFromReact = async () => {
    let response = await getDeltaiProduct(id);
    if (response && response.errcode === 0) {
      setdetailProducts(response.products);
    }
  };
  let imageBase64='';
  if(detailProducts.image){

   
     imageBase64=Buffer.from(detailProducts.image,'base64').toString('binary');
  

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
            <button onClick={() => addToCart(detailProducts)}>
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
