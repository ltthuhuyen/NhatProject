import { use } from 'express/lib/router';
import tempService from '../services/tempService'


let  handleCreateTemp = async (req, res) =>{
    let message = await tempService.createNewTemp(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleGetAllTemps = async(req, res) => {
    let id = req.query.giverId; //all, id

    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            temps: []  
        })
    }

    let temps = await tempService.getAllTemps(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        temps
    })
}


let handleDeleteTemp  = async (req, res) =>{
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Không tìm thấy sản phẩm'
        });
    }
    let message = await tempService.deleteTemp(req.body.id);
    return res.status(200).json(message);
  
}


// let handleUpdateStatus = async (req, res) =>{
//     let data = req.body;
//     let message = await scheduleService.updateStatus(data);
//     return res.status(200).json(message);
// }




module.exports ={
    handleCreateTemp: handleCreateTemp,
    handleGetAllTemps: handleGetAllTemps,
    handleDeleteTemp: handleDeleteTemp
    // handleUpdateStatus: handleUpdateStatus
}