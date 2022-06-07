import { preProcessFile } from 'typescript';
import axios from '../axios';


const createNewTemp = (data) => {
    return axios.post('/api/create-new-temp', data)
}

const getAllTemps = (giverId) => {
    return axios.get(`/api/get-all-temps?giverId=${giverId}`)
}

const deleteTempSerVice = (tempId) => {
    return axios.delete('/api/delete-temp', {
        data: {id: tempId}
    });
}

const saveBulkScheduleAppoinment = (data) => {
    return axios.post('/api/create-new-schedule', data)
}


const saveUpdateStatic = (inputData) => {
    return axios.put('/api/update-status', inputData)
        
}
export {
    createNewTemp,
    getAllTemps,
    deleteTempSerVice,
    saveBulkScheduleAppoinment,
    saveUpdateStatic
   
}