import { preProcessFile } from 'typescript';
import axios from '../axios';


const getAllCollectionForm = (inputId) => {
    return axios.get(`/api/get-all-apointmenpts?id=${inputId}`)
}

const getCollectionFormOfGiver = (inputId) => {
    return axios.get(`/api/get-apointmenpt-of-giver?giverId=${inputId}`)
}


export {
    getAllCollectionForm,
    getCollectionFormOfGiver
   
}