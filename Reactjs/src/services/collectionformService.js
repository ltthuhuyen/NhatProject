import { preProcessFile } from 'typescript';
import axios from '../axios';

const getAllCollectionForm = (inputId) => {
    return axios.get(`/api/get-all-apointmenpts?id=${inputId}`)
}

const getNewCollectionForm = (inputId) => {
    return axios.get(`/api/get-apointmenpts-status-s1?id=${inputId}`)
}

const getRegisteredCollectionForm = (inputId) => {
    return axios.get(`/api/get-apointmenpts-status-s2?id=${inputId}`)
}

const getWaittingCollectionForm = (inputId) => {
    return axios.get(`/api/get-apointmenpts-status-s3?id=${inputId}`)
}

const getSuccessedCollectionForm = (inputId) => {
    return axios.get(`/api/get-apointmenpts-status-s4?id=${inputId}`)
}

const getCancelledCollectionForm = (inputId) => {
    return axios.get(`/api/get-apointmenpts-status-s5?id=${inputId}`)
}

const getCollectionFormOfGiver = (inputId) => {
    return axios.get(`/api/get-apointmenpt-of-giver?giverId=${inputId}`)
}

const getCollectionFormOfRegisteredRecipient = (inputId) => {
    return axios.get(`/api/get-apointmenpt-of-recipient-status-s2?recipientId=${inputId}`)
}
const getCollectionFormOfWaittingRecipient = (inputId) => {
    return axios.get(`/api/get-apointmenpt-of-recipient-status-s3?recipientId=${inputId}`)
}

const getCollectionFormOfSuccessedRecipient = (inputId) => {
    return axios.get(`/api/get-apointmenpt-of-recipient-status-s4?recipientId=${inputId}`)
}

const getCollectionFormOfCancelledRecipient = (inputId) => {
    return axios.get(`/api/get-apointmenpt-of-recipient-status-s5?recipientId=${inputId}`)
}




export {
    getAllCollectionForm,
    getNewCollectionForm,
    getRegisteredCollectionForm,
    getWaittingCollectionForm,
    getSuccessedCollectionForm,
    getCancelledCollectionForm,
    getCollectionFormOfGiver,
    getCollectionFormOfRegisteredRecipient,
    getCollectionFormOfWaittingRecipient,
    getCollectionFormOfSuccessedRecipient,
    getCollectionFormOfCancelledRecipient
}