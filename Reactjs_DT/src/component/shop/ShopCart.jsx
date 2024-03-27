import React, { useState } from "react";
import { Link } from "react-router-dom";

export const ShopCart = ({ shopItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

    //Chuyển đổi tiền tệ
  
  return (
    <>
      {shopItems.map((shopItems) => {
        return (
          <div className="box">
            <div className="product mtop">
              <div className="img">
                <span className="discount">{shopItems.discount}% Off</span>
                <img src={shopItems.cover} alt="" />
              </div>
              <div className="product-details">
                <h3>{shopItems.name}</h3>
                <div className="rate">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <div className="d_flex">
                  <div className="price">
                  <h4>{formatCurrency(shopItems.price)}</h4>
                  </div>
                  <div className="price-discount">
                   
                  </div>
                </div>
                <div className="d_flex">
                  <Link to="/productdetail">
                    <button onClick={() => productItems}>
                      <span>Chi tiết</span>
                    </button>
                  </Link>
                  <button onClick={() => addToCart(shopItems)}>
                    {/* <i className="fa fa-plus"></i> */}
                    <span>Mua ngay</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
