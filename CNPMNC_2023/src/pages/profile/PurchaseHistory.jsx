import React from "react";
import "./PurchaseHistory.scss";
import DataPH from "./DataPH";

const PurchaseHistory = () => {
  return (
    <>
      <div className="ph_wrapper">
        <h1>Lịch sử mua hàng</h1>

        <table>
          <thead>
            <tr class="history">
              <th>ID</th>
              <th>Tên sản phẩm </th>
              <th>Thông tin sản phẩm </th>
              <th>Giá tiền </th>
              <th>Hình ảnh </th>
              <th>Tình trạng đơn hàng</th>
              <th>Địa chỉ giao hàng </th>
              <th>Hành động </th>
            </tr>
          </thead>
          <tbody>
            {DataPH.map((value, index) => {
              return (
                <tr class="description" key={index}>
                  <th>{value.id}</th>
                  <th>{value.Name}</th>
                  <th>{value.Description} </th>
                  <th>{value.Price}</th>
                  <th>
                    <img src={value.url} alt="" />
                  </th>
                  <th>{value.status}</th>
                  <th>{value.address}</th>
                  <th>
                               
                               <button
                                 className=" btn"
                                 
                               >
                                 hủy đơn
                               </button>
                           
                             <span>  <button
                                 className="btn "
                                 
                               >
                               xem chi tiết đơn hàng
                               </button> </span>
                          
                             
                             
                           </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PurchaseHistory;