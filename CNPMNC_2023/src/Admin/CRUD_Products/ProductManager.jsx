import React, { Component } from "react";
import {
  getAllProducts,
  CreateProducts,
  deleteProducts,
  updateProductData,
  CreateCategories,
  deleteCategories,
  getAllCategories

} from "../../userService";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import ModalEditProducts from "./ModalEditProducts";
import ModalProducts from "./ModalProducts";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./ModalProducts.scss"
import ModalCategories from "./ModalCategories";
import { Buffer } from 'buffer';



class ProductManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProducts: [],
      arrCate:[],
      isOpenModalProduct: false,
      isOpenModalEditProduct: false,
      isOpenModalCategories: false,
      productEdit: {},
      currentPage: 1,
      productsPerPage: 5,
      previewImgURL:'',
    };
    this.handlePageChange = this.handlePageChange.bind(this); // Thêm dòng này
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
    await this.getAllCategoriesReact();
  }
  getAllCategoriesReact = async () => {
    let response = await getAllCategories("ALL");
    if (response && response.errcode == 0) {
      this.setState({
        arrCate: response.categories,
      });
    }
  };
  getAllUserFromReact = async () => {
    let response = await getAllProducts("ALL");
    if (response && response.errcode == 0) {
      this.setState({
        arrProducts: response.products,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalProduct: true,
    });
  };
  handleAddCategories = () => {
    this.setState({
      isOpenModalCategories: true,
    });
  };
  toggleCategoriesModal= () => {
    this.setState({
      isOpenModalCategories: !this.state.isOpenModalCategories,
    });
  };

  
  toggleUserModal = () => {
    this.setState({
      isOpenModalProduct: !this.state.isOpenModalProduct,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditProduct: !this.state.isOpenModalEditProduct,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await CreateProducts(data);
      if (response && response.errcode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalProduct: false,
          
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
       
      }
      //  console.log("response create user: " , response)
    } catch (e) {
      console.log(e);
    }
    // console.log('check data from child',data)
  };



  createNewCategories = async (data) => {
    try {
      let response = await CreateCategories(data);
      if (response && response.errcode !== 0) {
        alert(response.errMessage);
      } else {
        await this. getAllCategoriesReact();
        this.setState({
          isOpenModalCategories:false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
       
      }
      //  console.log("response create user: " , response)
    } catch (e) {
      console.log(e);
    }
    // console.log('check data from child',data)
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteProducts(user.id);
      if (res && res.errcode !== 0) {
        alert(res.errMessage);
        toast.error("Xóa thất bại");
      } else {
        await this.getAllUserFromReact();
        toast.success("Xóa Thành công");
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditProduct: true,
      productEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await updateProductData(user);
      if (res && res.errcode !== 0) {
        await this.getAllUserFromReact();
        toast.success("Sửa Thành công");
        this.setState({
          isOpenModalEditProduct: false,
        });
      } else {
        toast.error("Sửa Thất bại");
      }
    } catch (e) {
      console.log(e);
    }
  };


  handlePageChange(event, page) {
    this.setState({
      currentPage: page,
    });
  }
  

  /**Life cycle
   * Run component:
   * 1.run contrucstor-> init state
   * 2.did mouth(set state)
   * 3.render
   */

  render() {
    const { arrProducts,arrCate, currentPage, productsPerPage } = this.state;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = arrProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    return (
      <div className="hello">
        <ModalProducts
          isOpen={this.state.isOpenModalProduct}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
         <ModalCategories
          isOpen={this.state.isOpenModalCategories}
          toggleFromParent={this.toggleCategoriesModal}
          createNewCategories={this.createNewCategories}
        />
        {this.state.isOpenModalEditProduct && (
          <ModalEditProducts
            isOpen={this.state.isOpenModalEditProduct}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.productEdit}
            editUser={this.doEditUser}
          />
        )}

        <div></div>
        <div className="users-table mt-4 mx-3">
          <div className="col">
            <div className="col-md-12">
              <div className="f-index">
                
                <div className="tabular--wrapper">
                  <button
                    className=" btn btn-primary px-3 mr-3"
                    onClick={() => this.handleAddNewUser()}
                  >
                    <i className="fas fa-user-plus mr-2"></i>Thêm sản phẩm
                  </button>
                  <button
                    className=" btn btn-primary px-3"
                    onClick={() => this.handleAddCategories()}
                  >
                  <i class="fas fa-box mr-2"></i>Thêm Loại sản phẩm
                  </button>
                  
                  <h2 className="h2--title">Danh sách sản phẩm</h2>

                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Tên sản phẩm</th>
                          <th>giá</th>
                          <th>số lượng</th>
                          <th>loại</th>
                          <th>hình ảnh</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentProducts &&
                          currentProducts.map((item, index) => {
                            let imageBase64='';
                            if(item.image){
                    
                             
                               imageBase64=Buffer.from(item.image,'base64').toString('binary');
                            
                    
                          }
                            
                            

                            return (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                              
                                <td>{item.idCateData.name}</td>
                               <td > 
                               <div className="imagene" style={{backgroundImage:`url(${imageBase64})`}}>

                               </div>
                                
                                 </td>
      
     
                      
                        

                                <td>
                                  <button
                                    className="btn-edit"
                                    onClick={() => {
                                      this.handleEditUser(item);
                                    }}
                                  >
                                    <i className="fa-regular fa-pen-to-square"></i>
                                  </button>

                                  <span> </span>

                                  <button
                                    className="btn-del"
                                    onClick={() => {
                                      this.handleDeleteUser(item);
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
                    <Pagination shape="rounded"
                      count={Math.ceil(arrProducts.length / productsPerPage)}
                      page={currentPage}
                      onChange={this.handlePageChange}
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
  }
}

export default ProductManager;
