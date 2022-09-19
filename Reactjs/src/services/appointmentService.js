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

const saveUpdateStaticS2 = (inputData) => {
    return axios.put('/api/update-status-s2', inputData)
        
}

const saveUpdateStatic = (inputData) => {
    return axios.put('/api/update-status', inputData)
        
}
export {
    createNewTemp,
    getAllTemps,
    deleteTempSerVice,
    saveBulkScheduleAppoinment,
    saveUpdateStaticS2,
    saveUpdateStatic
   
}