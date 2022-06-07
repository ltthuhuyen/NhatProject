import db from "../models/index";

let createNewSchedule = (data) => {
    console.log("check data",data.arrSchedule)
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

let updateStatus = (data) => {
    return new Promise(async (resolve, reject) =>{
        console.log("check data",data)
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu các thông số bắt buộc'
                })
            }
            else{
                let schedule = await db.Schedule.findOne({
                    where: {id: data.id},
                    raw: false
                }) 
                console.log("check schedule",schedule)
                if (schedule) {
                    schedule.statusType = data.status,
                    await schedule.save();
                    resolve({
                        errCode: 0,
                        errMessange: 'Sản phẩm đã được cập nhật thành công '
                    });
                }else {
                    resolve({
                        errCode: 1,
                        errMessange: 'Không tìm thấy sản phẩm'
                    });
                }              
                
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports ={
    createNewSchedule: createNewSchedule,
    updateStatus:updateStatus
  
}