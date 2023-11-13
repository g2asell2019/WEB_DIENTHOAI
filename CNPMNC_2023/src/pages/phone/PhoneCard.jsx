import React, { useState, useEffect } from "react";
import { getAllProducts, getAllBrand } from "../../userService";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const PhoneCard = ({ addToCart }) => {
  const { id } = useParams();

  const [arrProducts, setArrProducts] = useState([]);
  const [arrbrand, setArrbrand] = useState('');
  const [idbrand, setidbrand] = useState('');
  const [orderBy, setordeby] = useState('');
  const [selectedPriceRange, setgia] = useState('');
  useEffect(() => {
    getAllUserFromReact();
    getAllBrandFromReact();
  }, [idbrand, orderBy]);

  const getAllUserFromReact = async () => {
    let idCate = '';
    if (id && id == 20) {
      idCate = '';
    } else {
      idCate = id;
    }
    let response = await getAllProducts("ALL", idCate, idbrand, selectedPriceRange, orderBy);
    if (response && response.errcode === 0) {
      setArrProducts(response.products);
    }
  };

  const getAllBrandFromReact = async () => {
    let response = await getAllBrand("ALL");
    if (response && response.errcode === 0) {
      setArrbrand(response.Brand);
    }
  };

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = arrProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(arrProducts.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    const formattedNumber = formatter.format(number);

    return formattedNumber.replace(/\s/g, "");
  }

  const handleBrandClick = (clickedId) => {
    setidbrand(clickedId);
  };

  const handleOrderClick = (order) => {
    setordeby(order);
  };

  return (
    <>
      {arrbrand && arrbrand.map((gia, stt) => {
        let imageBase63 = '';
        if (gia.image) {
          imageBase63 = Buffer.from(gia.image, 'base64').toString('binary');
        }
        return (
          <div className="list-Brand" key={stt} onClick={() => handleBrandClick(gia.id)}>
            <img src={imageBase63} alt="" />
          </div>
        );
      })}

      <hr />

      <div className="sapxep">
        Sắp xếp theo
      </div>
      <span className={`high ${orderBy === "price-desc" ? "active" : ""}`} onClick={() => handleOrderClick("price-desc")}>
        <i className="fas fa-sort-amount-up-alt mr-2"></i>Giá Cao-Thấp
      </span>
      <span className={`low ${orderBy === "price-asc" ? "active" : ""}`} onClick={() => handleOrderClick("price-asc")}>
        <i className="fas fa-sort-amount-down mr-2"></i>Giá Thấp-Cao
      </span>

      <div className="grid1-p">
        {currentItems.map((item, index) => {
          let imageBase64 = '';
          if (item.image) {
            imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
          }
          return (
            <div className="box" key={index}>
              <div className="product mtop ">
                <div className="img">
                  <span className="discount">{}% Off</span>
                  <Link to={`/productdetail/${item.id}`}>
                    <img src={imageBase64} alt="" />
                  </Link>
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
                      <strike>123$</strike>
                    </div>
                  </div>
                  <div className="d_flex">
                    <Link to={`/productdetail/${item.id}`}>
                      <button>
                        <span>Chi tiết</span>
                      </button>
                    </Link>
                    <button onClick={() => addToCart(item)}>
                      <span>Mua ngay</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination d_flex">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i class="fa-solid fa-arrow-left-long"></i>
        </button>
        <div>
          Trang {currentPage} / {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i class="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
    </>
  );
};
