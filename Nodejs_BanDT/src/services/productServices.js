
import db from "../models/index";
let getAllproducts =(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users='';
            if(userId=='ALL'){
                users=db.User.findAll({
                    // ẩn mật khẩu
                    attributes:{
                        exclude:['password']
                    }

                })

            }
            if(userId && userId !== 'ALL')
            {
                users = await db.User.findOne({
                    where:{id:userId},//  userId laf cais tham so truyen vao
                     // ẩn mật khẩu
                     attributes:{
                        exclude:['password']
                    }
                });
               
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })

}

let CreateNewUser=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            // check taikhoan is exist??
            let check= await checkUsertaikhoan(data.taikhoan);
            if(check==true){
                resolve({
                    errcode:1,
                    errMessage:"Tên người dùng đã tồn tại vui lòng nhập tên người dùng  khác"
                })
            }else{
                let hashPasswordFromBcrypt=await hashUserPassword(data.password);
                await db.User.create({
                    taikhoan:data.taikhoan,
                    password:hashPasswordFromBcrypt,
                    fullName: data.fullName,                    
                    address:data.address,
                    phoneNumber:data.phoneNumber, 
                    email:data.email,                                
                    roleId: data.roleId,                  
                    image:data.avatar                  
                });
                if(data && data.image){
                    data.image=Buffer.from(data.image,'base64').toString('binary');

                }
                if(!data){
                    data={};
                }
                resolve({
                    errcode:0,
                    data:data
                })
    
                resolve({
                    errcode:0,
                    message:'OK'
                })
            }
            
           
            
        } catch (e) 
        {
            reject(e);
            
        }
    })
}
let deleteUser =(userId)=>{
    return new Promise(async(resolve,reject)=>{
        let user =await db.User.findOne({
            where:{id:userId}
        })
        if(!user){
            resolve({
                errcode:2,
                errMessage:"the user isn't exist !"
            })
        }
        await db.User.destroy({
            where:{id:userId}
        });
        resolve({
            errcode:0,
            errMessage:"the user is deleted !"

        });
    })
}
let updateUserData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {

            if(!data.id||!data.gender){
                resolve({
                    errcode:2,
                    errMessage:"Missing required parameter"
                })
            }
            let user = await db.User.findOne({
                where:{id:data.id},
                raw:false
              })
              if(user){
                user.fullName=data.fullName;
                user.address=data.address;
                user.phoneNumber=data.phoneNumber;
                user.email=data.email;
                user.roleId=data.roleId;                           
                if(data.avatar){
                    user.image=data.avatar;
                    
                }
                
                user.image=data.avatar;
                await user.save();
                // await db.User.save({
                //     fistName:data.firstName,
                //     lastName:data.lastName,
                //     address:data.address,

                // }); //  muốn không bị lỗi TypeError: user.save is not a function thì vào config.json đổi raw: true --> false  là đc
                resolve({
                    errcode:0,
                    errMessage:"update the user succeeds !"
                });
              }
              else{
                resolve({
                    errcode:1,
                    errMessage:"User's not found !"
                });         
              }
        } catch (e) {
            reject(e)
            
        }
    })
}


module.exports={
    getAllUsers:getAllUsers,
    CreateNewUser:CreateNewUser,
    deleteUser:deleteUser,
    updateUserData:updateUserData,
}