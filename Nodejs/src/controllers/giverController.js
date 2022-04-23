import { use } from 'express/lib/router';
import giverService from '../services/giverService'


let  handleCreateSchedule = async (req, res) =>{
    let message = await giverService.createNewSchedule(req.body);
    console.log(message);
    return res.status(200).json(message);
}



module.exports ={
    handleCreateSchedule: handleCreateSchedule
    
}