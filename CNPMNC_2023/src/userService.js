import axios from "./axios"

const handleLoginApi = (userName, userPassword) => {
    return axios.post('/api/login', { taikhoan: userName, password: userPassword });
}

const getAllUser = (inputId) => {
    //teamplate String
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUseService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    //return axios.delete('/api/delete-user',{id:userId})
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)

}


// goi api cua products

const getAllProducts = (inputId) => {
    //teamplate String
    return axios.get(`api/get-all-products?id=${inputId}`)
}
const CreateProducts = (data) => {
    return axios.post('/api/create-new-products', data)
}
const deleteProducts = (productId) => {

    return axios.delete('/api/delete-products', {
        data: {
            id: productId
        }
    })
}
const updateProductData = (inputData) => {
    return axios.put('/api/edit-products', inputData)

}

// cua categories

const CreateCategories = (data) => {
    return axios.post('/api/create-new-categories', data)
}
const deleteCategories = (productId) => {

        return axios.delete('/api/delete-categories', {
            data: {
                id: productId
            }
        })
    }
    // lay tat ca loai san pham
const getAllCategories = (inputType) => {
    return axios.get(`/api/get-all-categories?id=${inputType}`)
}







export {
    handleLoginApi,
    getAllUser,
    createNewUseService,
    deleteUserService,
    editUserService,
    getAllProducts,
    CreateProducts,
    deleteProducts,
    updateProductData,
    CreateCategories,
    deleteCategories,
    getAllCategories


}