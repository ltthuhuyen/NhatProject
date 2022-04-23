import { preProcessFile } from 'typescript';
import axios from '../axios';

const getAllProducts = (inputId) => {
    return axios.get(`/api/get-all-products?id=${inputId}`)
}
const createNewProductService = (data) => {
    return axios.post('/api/create-new-product', data)
}
const editProductService = (inputData) => {
    return axios.put('/api/edit-product', inputData)
        
}
const deleteProductSerVice = (userId) => {
    return axios.delete('/api/delete-product', {
        data: {
        id: userId}
    });
}

export {
    getAllProducts,
    createNewProductService,
    editProductService,
    deleteProductSerVice
}