import { use } from 'express/lib/router';
import appointmentService from '../services/appointmentService'


let  handleGetAllAppointments = async (req, res) =>{
    let id = req.query.id; //all, id

    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            appointments: []  
        })
    }

    let appointments = await appointmentService.getAllAppointments(id);
    console.log(appointments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        appointments
        
    })
}

let handleAppointmentsOfGiver = async (req, res) =>{
    let id = req.query.giverId; //all, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            appointments: []  
        })
    }

    let appointments = await appointmentService.getAppointmentsOfGiver(id);
    console.log(appointments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        appointments
        
    })
}




module.exports ={
    handleGetAllAppointments: handleGetAllAppointments,
    handleAppointmentsOfGiver: handleAppointmentsOfGiver
    
}