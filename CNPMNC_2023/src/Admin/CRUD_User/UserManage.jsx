import React, { Component } from 'react';
import './UserManage.scss';
import { getAllUser,createNewUseService,editUserService,deleteUserService} from '../../userService';
import ModalUser from './ModalUser';
import{emitter} from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';


import {toast} from "react-toastify";

class UserManage extends Component {
    constructor(props){
        super(props);
        this.state={
            arrUsers:[],
            isOpenModalUser: false,
            isOpenModalEditUser:false,    
            userEdit:{}     
           }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
       
       
    }
    getAllUserFromReact=async()=>{
        let response =await getAllUser('ALL');
        if(response && response.errcode==0){
         this.setState({
             arrUsers:response.users
 
             });
        
        }
    }

    handleAddNewUser =()=>{
        this.setState({
            isOpenModalUser:true,


        })
        

    }
    toggleUserModal=()=>{
        this.setState({
            isOpenModalUser:!this.state.isOpenModalUser

        })
    }
    toggleUserEditModal=()=>{
        this.setState({
            isOpenModalEditUser:!this.state.isOpenModalEditUser,
        })
    }
 
    createNewUser= async(data)=>{
       
        try {
           let response=await createNewUseService(data); 
           if(response&&response.errcode !==0){
            alert(response.errMessage)
           }else{
            await this.getAllUserFromReact();
            this.setState({
                isOpenModalUser:false
            })
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
           }
         //  console.log("response create user: " , response)
        } catch (e) {
            console.log(e);
        }
       // console.log('check data from child',data)
    }

    handleDeleteUser=async(user)=>{
       
        try {
         let res=   await deleteUserService(user.id);
         if(res&&res.errcode !==0){
            alert(res.errMessage)
            toast.error("Xóa thất bại")
           }else{
            await this.getAllUserFromReact();
            toast.success("Xóa Thành công")
            
            
           
           }
         console.log(res)
        } catch (e) {
            console.log(e)
            
        }
    }




    handleEditUser=(user)=>{

        this.setState({
            isOpenModalEditUser:true,
            userEdit:user
        })

    }

    doEditUser=async(user)=>{
        try {
            let res= await editUserService(user);
            if(res && res.errcode==0){
                this.setState({
                    isOpenModalEditUser:false
                })
                await this.getAllUserFromReact();
                toast.error("Sửa Thất bại")
            }
            else{
               
            }
            
        } catch (e) {
            console.log(e);
        }

    }
               

   
/**Life cycle
 * Run component:
 * 1.run contrucstor-> init state
 * 2.did mouth(set state)
 * 3.render
 */

    render() {
        console.log('check render',this.state)
        let arrUsers=this.state.arrUsers;
       
        return (
            <div className="users-container">
                <ModalUser
                isOpen={this.state.isOpenModalUser}
                toggleFromParent={this.toggleUserModal}
                createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser&&
                <ModalEditUser
                isOpen={this.state.isOpenModalEditUser}
                toggleFromParent={this.toggleUserEditModal}
                currentUser={this.state.userEdit}
                editUser={this.doEditUser}
                />
                }

             
                <div className='title text-center'>
                   Danh sách tài khoản
                </div>
                <div>
                    <button className='btn-create btn btn-primary px-3'
                    onClick={()=>this.handleAddNewUser()}
                    ><i className="fas fa-user-plus"></i>Thêm khách hàng</button>
                </div>
                <div className='users-table mt-4 mx-3'>
                <table id="customers">
                <tbody>
                      <tr>
                        <th>Tài Khoản</th>
                        <th>Họ và tên</th>                       
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>email</th>
                        <th>Hành động</th>

                      </tr>
                
                        {
                            arrUsers&&arrUsers.map((item,index)=>{
                                console.log('tanh check map',item,index)
                                return(
                                    <tr> 
                                        <td>{item.taikhoan}</td>
                                        <td>{item.fullName}</td>                                      
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.email}</td>
                                        
                                        <td>
                                            <button className='btn-edit'
                                            onClick={()=>{
                                                this.handleEditUser(item)
                                            }}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'
                                            onClick={()=>{
                                               this.handleDeleteUser(item)

                                            }}><i className="fas fa-trash"></i></button>
                                        </td>
                                      

                                    </tr>
                                )

                            })
                               
                           

                        }
                   </tbody>    
                      

                </table>
              


                </div>
              
               








            </div>
        );
    }

}



export default UserManage;
