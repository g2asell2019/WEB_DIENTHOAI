import React, { useState, useEffect } from "react";
import "./OrderHistory.scss";
import {
  CreateOrders,
  getAllOrderdetail,
  getAllOders,
  deleteOrderdetail,
  deleteOrders,
} from "../../userService";
import { toast } from "react-toastify";
import { Link, useHistory, Redirect } from "react-router-dom";

const OrderHistory = () => {
  const [user, setUser] = useState({ username: "" });
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getUserDataFromLocalStorage = async () => {
      const userData = localStorage.getItem("user");

      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    };

    getUserDataFromLocalStorage();
  }, []); // Thêm mảng rỗng để chỉ chạy một lần khi component mount

  useEffect(() => {
    if (user.id) {
      laymahdcuataikhoan();
    }
  }, [user.id]);

  const khongduochuy = () => {
    toast.error("Đơn hàng đã xác nhận không thể hủy !!!!");
  };

  const huydonhang = async (data) => {
    try {
      let res = await deleteOrders(data.id);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        toast.success("Hủy đơn hàng Thành công");
        await laymahdcuataikhoan();
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const laymahdcuataikhoan = async () => {
    try {
      let response = await getAllOders(user.id);
      if (response && response.errCode === 0) {
        setOrders(response.orders);
      }
    } catch (error) {
      console.log("hong lay dc:");
    }
  };

  const xoachitietdonhang = async (data) => {
    try {
      let res = await deleteOrderdetail(data.id_order);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const taomoidonhang = async (data) => {
    try {
      const response = await CreateOrders(data);
      if (response && response.errCode !== 0) {
        toast.error("Đặt hàng thất bại");
        alert(response.errMessage);
      } else {
        setTotalPrice(0);
        toast.success("Đặt hàng thành công");
        setState({
          receiver: "",
          order_status: "",
          receiving_point: "",
          total_value: "",
          note: "",
          phoneNumber: "",
          payment: "",
          order_idUser: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Prototype pattern
  const reordering = (order) => {
    const clonedOrder = { ...order };
    const getOrderDetail = getAllOrderdetail(clonedOrder.id_order);
    taomoidonhang({
      receiver: clonedOrder.receiver,
      receiving_point: clonedOrder.receiving_point,
      order_status: "Đang chờ duyệt",
      total_value: clonedOrder.total_value,
      phoneNumber: clonedOrder.phoneNumber,
      note: clonedOrder.note,
      payment: clonedOrder.payment,
      order_idUser: user.id,
    });

    console.log("Reorder:", clonedOrder);
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

  const formatCurrency = (number) => {
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
  };

  {
    user && <OrderHistory />;
  }

  return (
    <>
      <div className="oh_wrapper">
        <h1>LỊCH SỬ ĐẶT HÀNG</h1>

        <table>
          <thead>
            <tr className="history">
              <th>ID</th>
              <th>Tổng tiền</th>
              <th>Ngày đặt</th>
              <th>Địa chỉ giao hàng</th>
              <th>Tình trạng đơn hàng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr className="description" key={index}>
                  <th>{order.id_order}</th>
                  <th>{formatCurrency(order.total_value)}</th>
                  <th>{formatDate(order.createdAt)}</th>
                  <th>{order.receiving_point}</th>
                  <th>{order.order_status} </th>
                  <td>
                    <button
                      className="button_reordering"
                      onClick={() => reordering(order)}
                    >
                      Đặt lại đơn hàng
                    </button>
                    <Link
                      to={`/profile/OrderDetail/${order.id_order}`}
                      className="a_detail"
                    >
                      Xem chi tiết đơn hàng
                    </Link>

                    <button
                      className="button_del"
                      onClick={() => {
                        order.order_status === "Đang chờ duyệt"
                          ? (huydonhang(order), xoachitietdonhang(order))
                          : khongduochuy();
                      }}
                    >
                      Hủy đơn
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderHistory;
