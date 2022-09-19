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

let handleAppointmentsNew = async (req, res) =>{
    let id = req.query.id; //all, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            appointments: []  
        })
    }

    let appointments = await appointmentService.getAppointmentsNew(id);
    console.log(appointments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        appointments
        
    })
}

let handleAppointmentsStatusS2 = async (req, res) =>{
    let id = req.query.id; //all, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            appointments: []  
        })
    }

    let appointments = await appointmentService.getAppointmentStatusS2(id);
    console.log(appointments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        appointments
        
    })
}


let handleAppointmentsStatusS3 = async (req, res) =>{
    let id = req.query.id; //all, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            appointments: []  
        })
    }

    let appointments = await appointmentService.getAppointmentStatusS3(id);
    console.log(appointments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        appointments
        
    })
}

let handleAppointmentsStatusS4 = async (req, res) =>{
    let id = req.query.id; //all, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            appointments: []  
        })
    }

    let appointments = await appointmentService.getAppointmentStatusS4(id);
    console.log(appointments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        appointments
        
    })
}

let handleAppointmentsStatusS5 = async (req, res) =>{
    let id = req.query.id; //all, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            appointments: []  
        })
    }

    let appointments = await appointmentService.getAppointmentStatusS5(id);
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

    let appointments = await appointmentService.getAppointmentsOfGiver(id, 'S3');
    console.log(appointments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        appointments
        
    })
}

let handleAppointmentsOfRecipientStatusS2 = async (req, res) =>{
    let id = req.query.recipientId; //all, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            appointments: []  
        })
    }

    let appointments = await appointmentService.getAppointmentsOfRecipientStatusS2(id);
    console.log(appointments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        appointments
        
    })

    
}

let handleAppointmentsOfRecipientStatusS3 = async (req, res) =>{
    let id = req.query.recipientId; //all, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            appointments: []  
        })
    }

    let appointments = await appointmentService.getAppointmentsOfRecipientStatusS3(id);
    console.log(appointments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        appointments
        
    })

    
}

let handleAppointmentsOfRecipientStatusS4 = async (req, res) =>{
    let id = req.query.recipientId; //all, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            appointments: []  
        })
    }

    let appointments = await appointmentService.getAppointmentsOfRecipientStatusS4(id);
    console.log(appointments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        appointments
        
    })

    
}

let handleAppointmentsOfRecipientStatusS5 = async (req, res) =>{
    let id = req.query.recipientId; //all, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            appointments: []  
        })
    }

    let appointments = await appointmentService.getAppointmentsOfRecipientStatusS5(id);
    console.log(appointments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        appointments
        
    })

    
}




module.exports ={
    handleGetAllAppointments: handleGetAllAppointments,
    handleAppointmentsNew: handleAppointmentsNew,
    handleAppointmentsStatusS2: handleAppointmentsStatusS2,
    handleAppointmentsStatusS3: handleAppointmentsStatusS3,
    handleAppointmentsStatusS4: handleAppointmentsStatusS4,
    handleAppointmentsStatusS5: handleAppointmentsStatusS5,
    handleAppointmentsOfGiver: handleAppointmentsOfGiver,
    handleAppointmentsOfRecipientStatusS2: handleAppointmentsOfRecipientStatusS2,
    handleAppointmentsOfRecipientStatusS3: handleAppointmentsOfRecipientStatusS3,
    handleAppointmentsOfRecipientStatusS4: handleAppointmentsOfRecipientStatusS4,
    handleAppointmentsOfRecipientStatusS5: handleAppointmentsOfRecipientStatusS5
    
}