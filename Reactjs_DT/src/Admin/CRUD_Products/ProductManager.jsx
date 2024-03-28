import React, { Component, useState, useEffect, useRef } from "react";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  createCategory,
  deleteCategory,
  getAllCategories,
  getAllBrand,
} from "../../userService";
// Singleton pattern
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import ModalEditProducts from "./ModalEditProducts";
import ModalProducts from "./ModalProducts";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./ModalProducts.scss";
import ModalCategories from "./ModalCategories";
import { Buffer } from "buffer";

const ProductManager = () => {
  const [arrProducts, setArrProducts] = useState([]);
  const [arrCate, setArrCate] = useState([]);
  const [arrBrand, setArrBrand] = useState([]);
  const [cateId, setCateId] = useState("");
  const [idbrand, setIdbrand] = useState("");
  const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);
  const [isOpenModalEditProduct, setIsOpenModalEditProduct] = useState(false);
  const [isOpenModalCategories, setIsOpenModalCategories] = useState(false);
  const [productEdit, setProductEdit] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [previewImgURL, setPreviewImgURL] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [search, setSearch] = useState("");

  const handleOnChangeInput = (event, id) => {
    const value = event.target.value;
    switch (id) {
      case "cateId":
        setCateId(value);
        break;
      case "idbrand":
        setIdbrand(value);
        break;
      case "selectedPriceRange":
        setSelectedPriceRange(value);
        break;
      case "orderBy":
        setOrderBy(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllCategoriesReact();
      await getAllBrandReact();
      await getAllUserFromReact(cateId, idbrand, selectedPriceRange, orderBy);
    };
    fetchData();
  }, [cateId, idbrand, selectedPriceRange, orderBy]);

  const getAllCategoriesReact = async () => {
    let response = await getAllCategories("ALL");
    if (response && response.errCode == 0) {
      setArrCate(response.categories);
    }
  };

  const getAllBrandReact = async () => {
    let response = await getAllBrand("ALL");
    if (response && response.errCode == 0) {
      setArrBrand(response.Brand);
    }
  };

  const getAllUserFromReact = async (
    cateId,
    idbrand,
    selectedPriceRange,
    orderBy
  ) => {
    let response = await getAllProducts(
      "ALL",
      cateId,
      idbrand,
      selectedPriceRange,
      orderBy
    );

    if (response && response.errCode == 0) {
      setArrProducts(response.products);
    }
  };

  const handleAddNewUser = () => {
    setIsOpenModalProduct(true);
  };
  const handleAddCategory = () => {
    setIsOpenModalCategories(true);
  };
  const toggleCategoriesModal = () => {
    setIsOpenModalCategories(!isOpenModalCategories);
  };

  const toggleUserModal = () => {
    setIsOpenModalProduct(!isOpenModalProduct);
  };

  const toggleUserEditModal = () => {
    setIsOpenModalEditProduct(!isOpenModalEditProduct);
  };

  const createNewUser = async (data) => {
    try {
      let response = await createProduct(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await getAllUserFromReact(cateId, idbrand, selectedPriceRange, orderBy);
        setIsOpenModalProduct(false);
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createNewCategories = async (data) => {
    try {
      let response = await createCategory(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
        toast.error("tạo thất bại");
      } else {
        await getAllUserFromReact(cateId, idbrand, selectedPriceRange, orderBy);
        setIsOpenModalCategories(false);
        toast.success("Tạo thành công");
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      let res = await deleteProduct(user.id);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
        toast.error("Xóa thất bại");
      } else {
        await getAllUserFromReact(cateId, idbrand, selectedPriceRange, orderBy);
        toast.success("Xóa Thành công");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateUser = (user) => {
    setIsOpenModalEditProduct(true);
    setProductEdit(user);
  };

  const doEditUser = async (user) => {
    try {
      let res = await updateProduct(user);
      if (res && res.errCode === 0) {
        await getAllUserFromReact(cateId, idbrand, selectedPriceRange, orderBy);
        toast.success("Sửa Thành công");
        setIsOpenModalEditProduct(false);
      } else {
        toast.error("Sửa Thất bại");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const formatCurrency = (number) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
    const formattedNumber = formatter.format(number);
    return formattedNumber.replace(/\s/g, "");
  };

  return (
    <div className="hello">
      <ModalProducts
        isOpen={isOpenModalProduct}
        toggleFromParent={toggleUserModal}
        createNewUser={createNewUser}
      />
      <ModalCategories
        isOpen={isOpenModalCategories}
        toggleFromParent={toggleCategoriesModal}
        createNewCategories={createNewCategories}
      />
      {isOpenModalEditProduct && (
        <ModalEditProducts
          isOpen={isOpenModalEditProduct}
          toggleFromParent={toggleUserEditModal}
          currentUser={productEdit}
          editUser={doEditUser}
        />
      )}

      <div className="users-table mt-4 mx-3">
        <div className="col">
          <div className="col-md-12">
            <div className="f-index">
              <div className="tabular--wrapper">
                <button
                  className=" btn btn-primary px-3 mr-3"
                  onClick={() => handleAddNewUser()}
                >
                  <i className="fas fa-box mr-2"></i>Thêm sản phẩm
                </button>
                <button
                  className=" btn btn-primary px-3"
                  onClick={() => handleAddCategory()}
                >
                  <i className="fas fa-box mr-2"></i>Thêm Loại sản phẩm
                </button>

                <h2 className="h2--title">Danh sách sản phẩm</h2>
                <div className="locsanpham">
                  <input
                    className="form-control col-2 mr-2"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm"
                  />

                  <select
                    className="form-control col-2 mr-2"
                    onChange={(event) => {
                      handleOnChangeInput(event, "cateId");
                    }}
                    value={cateId}
                  >
                    <option value="">Tất cả loại sản phẩm</option>
                    {arrCate &&
                      arrCate.length > 0 &&
                      arrCate.map((item, index) => {
                        return <option value={item.id}>{item.name}</option>;
                      })}
                  </select>

                  <select
                    className="form-control col-2 mr-2"
                    onChange={(event) => {
                      handleOnChangeInput(event, "idbrand");
                    }}
                    value={idbrand}
                  >
                    <option value="">Tất cả Hãng sản phẩm</option>
                    {arrBrand &&
                      arrBrand.length > 0 &&
                      arrBrand.map((item, index) => {
                        return <option value={item.id}>{item.name}</option>;
                      })}
                  </select>
                  <select
                    className="form-control col-3 mr-2"
                    onChange={(event) => {
                      handleOnChangeInput(event, "selectedPriceRange");
                    }}
                    value={selectedPriceRange}
                  >
                    <option value="">Tất cả giá</option>
                    <option value="0-5000000">0 - 5 triệu</option>
                    <option value="5000000-10000000">5 triệu - 10 triệu</option>
                    <option value="10000000-20000000">
                      10 triệu - 20 triệu
                    </option>
                    <option value="20000000-30000000">
                      20 triệu - 30 triệu
                    </option>
                    <option value="30000000-50000000">
                      30 triệu - 50 triệu
                    </option>
                    <option value="50000000-100000000">
                      50 triệu - 100 triệu
                    </option>
                    <option value="100000000-200000000">
                      100 triệu - 200 triệu
                    </option>
                    <option value="200000000-999999999999999999">
                      200 triệu - không giới hạn
                    </option>
                  </select>

                  <select
                    className="form-control col-2 mr-2"
                    onChange={(event) => {
                      handleOnChangeInput(event, "orderBy");
                    }}
                    value={orderBy}
                  >
                    <option value="">sắp xếp theo giá</option>
                    <option value="price-asc">Sắp xếp theo giá tăng dần</option>
                    <option value="price-desc">
                      Sắp xếp theo giá giảm dần
                    </option>
                  </select>
                </div>

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Hãng</th>
                        <th>Loại</th>
                        <th>hình ảnh</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arrProducts
                        .filter((item) => {
                          return search.toLowerCase() === ""
                            ? item
                            : item.name.toLowerCase().includes(search);
                        })
                        .map((item, index) => {
                          let imageBase64 = "";
                          if (item.image) {
                            imageBase64 = Buffer.from(
                              item.image,
                              "base64"
                            ).toString("binary");
                          }

                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{formatCurrency(item.price)}</td>
                              <td>{item.quantity}</td>
                              <td>{item.idBrandData.name}</td>
                              <td>{item.idCateData.name}</td>
                              <td>
                                <div
                                  className="imagene"
                                  style={{
                                    backgroundImage: `url(${imageBase64})`,
                                  }}
                                ></div>
                              </td>

                              <td>
                                <button
                                  className="btn-edit"
                                  onClick={() => {
                                    handleUpdateUser(item);
                                  }}
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>
                                </button>

                                <span> </span>

                                <button
                                  className="btn-del"
                                  onClick={() => {
                                    handleDeleteUser(item);
                                  }}
                                >
                                  <i className="fa-regular fa-trash-can"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="phantrang">
                  <Stack spacing={2}>
                    <Pagination
                      shape="rounded"
                      count={Math.ceil(arrProducts.length / productsPerPage)}
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

export default ProductManager;
