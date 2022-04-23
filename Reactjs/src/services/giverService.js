import { preProcessFile } from 'typescript';
import axios from '../axios';


const saveBulkScheduleAppoinment = (data) => {
    return axios.post('/api/create-new-schedule', data)
}

export {
    saveBulkScheduleAppoinment
   
}