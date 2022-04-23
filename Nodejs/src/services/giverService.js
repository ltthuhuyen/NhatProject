import db from "../models/index";

let createNewSchedule = (data) => {
    return new Promise(async (resolve, reject) =>{
        try {
            console.log("check data.arrSchedule",data.arrSchedule)
            if (!data.arrSchedule){
                resolve({
                    errCode: 1,
                    errMessage: 'Vui lòng chọn đủ thông tin!'
                })
            } else {
                let schedule = data.arrSchedule
                console.log('schedule', schedule)
                await db.Schedule.bulkCreate(schedule);
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
               })
            }
                
              
                
        } catch (e) {
            reject(e)
        }

    })

}



module.exports ={
    createNewSchedule: createNewSchedule,
  
}