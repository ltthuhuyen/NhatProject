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
  getAppointmentsOfGiver: getAppointmentsOfGiver
}