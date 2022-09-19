import db from "../models/index";

let getAllAppointments = (appointmentId)=> {
    return new Promise(async(resolve, reject) => {
        try{
            let appointments = '';
            if(appointmentId === 'ALL') {
                appointments = await db.Schedule.findAll({
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                })
            }
            console.log(appointments)
            if(appointmentId && appointmentId !== 'ALL') {
                appointments = await db.Schedule.findOne({
                    where: { id: appointmentId },
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                    
                   
                })
            }
            resolve(appointments)
        }catch(e) {
            reject(e)
        }
    })
}

// all đơn thu gom vừa mới tạo có status = 'chưa xác nhận'
let getAppointmentsNew  = (appointmentId)=> {
    return new Promise(async(resolve, reject) => {
        try{
            let appointments = '';
            if(appointmentId) {
                appointments = await db.Schedule.findAll({
                    where: { 
                        statusType: 'S1'
                    },
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                })
            }
            console.log(appointments)
            resolve(appointments)
        }catch(e) {
            reject(e)
        }
    })
}

let getAppointmentStatusS2 = (appointmentId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let appointments = '';
            if(appointmentId) {
                appointments = await db.Schedule.findAll({
                    where: { 
                        statusType: 'S2'
                    },
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                })
            }
            console.log(appointments)
            resolve(appointments)
        }catch(e) {
            reject(e)
        }
    })
}

let getAppointmentStatusS3 = (appointmentId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let appointments = '';
            if(appointmentId) {
                appointments = await db.Schedule.findAll({
                    where: { 
                        statusType: 'S3'
                    },
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                })
            }
            console.log(appointments)
            resolve(appointments)
        }catch(e) {
            reject(e)
        }
    })
}

let getAppointmentStatusS4 = (appointmentId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let appointments = '';
            if(appointmentId) {
                appointments = await db.Schedule.findAll({
                    where: { 
                        statusType: 'S4'
                    },
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                })
            }
            console.log(appointments)
            resolve(appointments)
        }catch(e) {
            reject(e)
        }
    })
}

let getAppointmentStatusS5 = (appointmentId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let appointments = '';
            if(appointmentId) {
                appointments = await db.Schedule.findAll({
                    where: { 
                        statusType: 'S5'
                    },
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                })
            }
            console.log(appointments)
            resolve(appointments)
        }catch(e) {
            reject(e)
        }
    })
}


let getAppointmentsOfGiver  = (giverId)=> {
    return new Promise(async(resolve, reject) => {
        try{
            let appointments = '';
            if(giverId) {
                appointments = await db.Schedule.findAll({
                    where: { giverId: giverId},
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                })
            }
            console.log(appointments)
            resolve(appointments)
        }catch(e) {
            reject(e)
        }
    })
}

let getAppointmentsOfRecipientStatusS2  = (recipientId)=> {
    return new Promise(async(resolve, reject) => {
        try{
            let appointments = '';
            if(recipientId) {
                appointments = await db.Schedule.findAll({
                    where: { recipientId: recipientId,
                        statusType: 'S2'
                    },
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                })
            }
            console.log(appointments)
            resolve(appointments)
        }catch(e) {
            reject(e)
        }
    })
}

let getAppointmentsOfRecipientStatusS3  = (recipientId)=> {
    return new Promise(async(resolve, reject) => {
        try{
            let appointments = '';
            if(recipientId) {
                appointments = await db.Schedule.findAll({
                    where: { recipientId: recipientId,
                        statusType: 'S3'
                    },
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                })
            }
            console.log(appointments)
            resolve(appointments)
        }catch(e) {
            reject(e)
        }
    })
}

let getAppointmentsOfRecipientStatusS4  = (recipientId)=> {
    return new Promise(async(resolve, reject) => {
        try{
            let appointments = '';
            if(recipientId) {
                appointments = await db.Schedule.findAll({
                    where: { recipientId: recipientId,
                        statusType: 'S4'
                    },
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                })
            }
            console.log(appointments)
            resolve(appointments)
        }catch(e) {
            reject(e)
        }
    })
}

let getAppointmentsOfRecipientStatusS5  = (recipientId)=> {
    return new Promise(async(resolve, reject) => {
        try{
            let appointments = '';
            if(recipientId) {
                appointments = await db.Schedule.findAll({
                    where: { recipientId: recipientId,
                        statusType: 'S5'
                    },
                    include:[
                        {
                            model: db.User, as: 'giverData',
                        },
                        {
                            model: db.User, as: 'recipientData',
                        },
                        {
                            model: db.Product , as: 'productData'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeData'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeData'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                })
            }
            console.log(appointments)
            resolve(appointments)
        }catch(e) {
            reject(e)
        }
    })
}

module.exports ={
  getAllAppointments: getAllAppointments,
  getAppointmentsNew: getAppointmentsNew,
  getAppointmentStatusS2: getAppointmentStatusS2,
  getAppointmentStatusS3: getAppointmentStatusS3,
  getAppointmentStatusS4: getAppointmentStatusS4,
  getAppointmentStatusS5: getAppointmentStatusS5,
  getAppointmentsOfGiver: getAppointmentsOfGiver,
  getAppointmentsOfRecipientStatusS2 : getAppointmentsOfRecipientStatusS2,
  getAppointmentsOfRecipientStatusS3: getAppointmentsOfRecipientStatusS3,
  getAppointmentsOfRecipientStatusS4: getAppointmentsOfRecipientStatusS4,
  getAppointmentsOfRecipientStatusS5: getAppointmentsOfRecipientStatusS5

}