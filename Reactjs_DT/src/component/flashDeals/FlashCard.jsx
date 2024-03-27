import React, { useState, useEffect } from "react";
import { getAllProducts,CreateCart} from "../../userService";
import { Buffer } from "buffer";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency.js";

import { toast } from 'react-toastify';

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
  const [user, setUser] = useState({ taikhoan: "" });
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
 


  const [arrProducts, setArrProducts] = useState([]);
  const [idne, setidne] = useState('');
  const [idbrand, setidbrand] = useState('');
  const [orderBy, setordeby] = useState('');
  const [selectedPriceRange, setgia] = useState('');
  useEffect(() => {
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
    let response = await getAllProducts("ALL",idne,idbrand,orderBy,selectedPriceRange);
    if (response && response.errcode === 0) {
      setArrProducts(response.products);
    }
  };
  {
    user && <FlashCard />;
  }
  return (
    <>
      <Slider {...settings}>
        {arrProducts.map((item,index) => {
             let imageBase64='';
             if(item.image){
     
              
                imageBase64=Buffer.from(item.image,'base64').toString('binary');
             
     
           }
             
          return (
            <article key={index.id}>
              <div className="box">
                <div className="product mtop">
                  <div className="img">
                    <span className="discount">
                      {item.discount}% Off
                    </span>
                    <Link to={`/productdetail/${item.id}`}>
                    <img src={imageBase64} alt="" />
                    </Link>

                    {/* <div className="product-like">
                    <label>0</label>
                    <br />
                    <i className="fa-regular fa-heart" onClick={increment}></i>
                  </div> */}
                  </div>
                  <div className="product-details">
                    <h3>{item.name}</h3>
                    <div className="rate">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <div className="d_flex">
                      <div className="price">
                        <h4>{formatCurrency(item.price)}</h4>
                      </div>
                      <div className="price-discount">
                    
                      </div>
                    </div>
                    <div className="d_flex">
                      <Link to={`/productdetail/${item.id}`}>
                        <button>
                          <span>Chi tiết</span>
                        </button>
                      </Link>
                      <button onClick={user && user.id ? () => handleAddCart(item) :  () => addToCart(item)}>
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
