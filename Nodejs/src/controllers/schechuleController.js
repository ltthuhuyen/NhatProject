import { use } from 'express/lib/router';
import scheduleService from '../services/scheduleService'


let  handleCreateSchedule = async (req, res) =>{
    let message = await scheduleService.createNewSchedule(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleUpdateStatusS2 = async (req, res) =>{
    let data = req.body;
    console.log("check data",data)
    let message = await scheduleService.updateStatusS2(data);
    return res.status(200).json(message);
}

let handleUpdateStatus = async (req, res) =>{
    let data = req.body;
    let message = await scheduleService.updateStatus(data);
    return res.status(200).json(message);
}




module.exports ={
    handleCreateSchedule: handleCreateSchedule,
    handleUpdateStatusS2: handleUpdateStatusS2,
    handleUpdateStatus: handleUpdateStatus
}