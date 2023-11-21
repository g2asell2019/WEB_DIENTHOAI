import React, { useState, useEffect } from "react";
import {
  getAllOders,
  deleteOrders,
  updateorderData
} from "../../userService";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./ModalProducts.scss";

const OrderManager = () => {
  const [arrOrders, setArrOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    getAllOrdersFromReact();
  }, []);

  const getAllOrdersFromReact = async () => {
    const response = await getAllOders("ALL");

    if (response && response.errcode === 0) {
      setArrOrders(response.orders);
    }
  };

  const handleDeleteOrders = async (user) => {
    try {
      const res = await deleteOrders(user.id);
      if (res && res.errcode !== 0) {
        alert(res.errMessage);
        toast.error("Xóa thất bại");
      } else {
        getAllOrdersFromReact();
        toast.success("Xóa Thành công");
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

const handlecapnhattrangthai=(data)=>{
capnhattrangthai({
  id:data.id,
  
})
  }




 const capnhattrangthai = async (user) => {
    try {
      let res = await updateorderData(user);
      if (res && res.errcode === 0) {
        await getAllOrdersFromReact();
        toast.success("Xác nhận thành công");

        
      } else {
        toast.error("Xác nhận thất bại");
      }
    } catch (e) {
      console.log(e);
    }
  };














  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  
  

  const formatDate = (isoDate) => {
    const dateObject = new Date(isoDate);
    // const hours = dateObject.getHours();
    // const minutes = dateObject.getMinutes();
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = arrOrders.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="hello">
      <div className="users-table mt-4 mx-3">
        <div className="col">
          <div className="col-md-12">
            <div className="f-index">
              <div className="tabular--wrapper">
                <h2 className="h2--title">Danh sách Đơn hàng</h2>
                <div className="locsanpham">
                  <select className="form-control col-3 mr-3">
                    <option value="">Tất cả hãng sản xuất</option>
                  </select>
                  <select className="form-control col-3 mr-3">
                    <option value="">Tất cả giá</option>
                  </select>
                  <select className="form-control col-3 mr-3">
                    <option value="">sắp xếp theo giá</option>
                    <option value="price-asc">Sắp xếp theo giá tăng dần</option>
                    <option value="price-desc">Sắp xếp theo giá giảm dần</option>
                  </select>
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Người Nhận</th>
                        <th>Ngày đặt</th>
                        <th>Địa chỉ nhận hàng</th>
                        <th>Số điện thoại</th>
                        <th>Phương thức thanh toán</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>ghi chú</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProducts &&
                        currentProducts.map((item, index) => (
                          <tr key={index}>
                            <td>{item.receiver}</td>
                            <td>{formatDate(item.createdAt)}</td>
                            <td>{item.receiving_point}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.payment}</td>
                            <td>{new Intl.NumberFormat().format(item.total_value)} đ</td>




                            <td>{item.order_status}</td>
                            <td>{item.note}</td>
                            <td>
                            <button
                                    className="btn-edit "
                                    onClick={() => {
                                      handlecapnhattrangthai(item);
                                    }}
                                  >
                                   xác nhận
                                  </button>

                                  <span> </span>
                              <span> </span>
                              <button
                                className="btn-del"
                                onClick={() => {
                                  handleDeleteOrders(item);
                                }}
                              >
                                <i className="fa-regular fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="phantrang">
                  <Stack spacing={2}>
                    <Pagination
                      shape="rounded"
                      count={Math.ceil(arrOrders.length / productsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                    />
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManager;
