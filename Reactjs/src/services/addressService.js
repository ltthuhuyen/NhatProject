import { preProcessFile } from 'typescript';
import axios from '../axios';


const getAllCities = () => {
    return axios.get('https://provinces.open-api.vn/api/')
}


const getAllDistricts = () => {
    return axios.get('https://provinces.open-api.vn/api/d')
}

const getAllWards = () => {
    return axios.get('https://provinces.open-api.vn/api/w/')
}

const getAllAddressOfUser = (userId) =>{
    return axios.get(`/api/get-all-address-of-user?userId=${userId}`)
}

const createNewAddressService = () => {
    return axios.post('/api/create-new-address')
}



export { 
    getAllCities,
    getAllDistricts,
    getAllWards,
    getAllAddressOfUser,
    createNewAddressService
}