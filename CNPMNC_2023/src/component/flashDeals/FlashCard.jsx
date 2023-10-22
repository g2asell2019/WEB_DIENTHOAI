import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};
export const FlashCard = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
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
  return (
    <>
      <Slider {...settings}>
        {productItems.map((productItems) => {
          return (
            <article key={productItems.id}>
              <div className="box">
                <div className="product mtop">
                  <div className="img">
                    <span className="discount">
                      {productItems.discount}% Off
                    </span>
                    <Link to={`/productdetail/${productItems.id}`}>
                      <img src={productItems.cover} alt="" />
                    </Link>

                    {/* <div className="product-like">
                    <label>0</label>
                    <br />
                    <i className="fa-regular fa-heart" onClick={increment}></i>
                  </div> */}
                  </div>
                  <div className="product-details">
                    <h3>{productItems.name}</h3>
                    <div className="rate">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <div className="d_flex">
                      <div className="price">
                        <h4>{formatCurrency(productItems.price)}</h4>
                      </div>
                      <div className="price-discount">
                        <strike>123$</strike>
                      </div>
                    </div>
                    <div className="d_flex">
                      <Link to={`/productdetail/${productItems.id}`}>
                        <button>
                          <span>Chi tiết</span>
                        </button>
                      </Link>
                      <button onClick={() => addToCart(productItems)}>
                        {/* <i className="fa fa-plus"></i> */}
                        <span>Mua ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </Slider>
    </>
  );
};
