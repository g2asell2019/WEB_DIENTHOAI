import React, { useState } from "react";
import { Link } from "react-router-dom";

export const PhoneCard = ({ phoneItems, addToCart }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  console.log({ endIndex });
  const currentItems = phoneItems.slice(startIndex, endIndex);
  console.log({ currentItems });
  const totalPages = Math.ceil(phoneItems.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
      <div className="grid1-p">
        {currentItems.map((phoneItems) => {
          return (
            <div className="box">
              <div className="product mtop ">
                <div className="img">
                  <span className="discount">{phoneItems.discount}% Off</span>
                  <Link to={`/productdetail/${phoneItems.id}`}>
                    <img src={phoneItems.cover} alt="" />
                  </Link>
                </div>
                <div className="product-details">
                  <h3>{phoneItems.name}</h3>
                  <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <div className="d_flex">
                    <div className="price">
                      <h4>{formatCurrency(phoneItems.price)}</h4>
                    </div>
                    <div className="price-discount">
                      <strike>123$</strike>
                    </div>
                  </div>
                  <div className="d_flex">
                    <Link to={`/productdetail/${phoneItems.id}`}>
                      <button>
                        <span>Chi tiết</span>
                      </button>
                    </Link>
                    <button onClick={() => addToCart(phoneItems)}>
                      {/* <i className="fa fa-plus"></i> */}
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
