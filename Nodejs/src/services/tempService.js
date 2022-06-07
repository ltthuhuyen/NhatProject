import db from "../models/index";


let checkProduct = (productId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let product = await db.Temp.findOne({
                where: {id: productId}
            })
            if(product) {
                resolve(true)
            }else {
                resolve(false)
            }
        } catch(e) {
            reject(e);
        }
    })
}

let createNewTemp = (data) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let check = await checkProduct(data.productId);
            console.log(check)
            if (check === true){
                resolve({
                    errCode: 1,
                    errMessange:'Sản phẩm này đã có đơn thu gom '
                })
            }
            else{
                await db.Temp.create({
                    productId: data.productId,
                    giverId: data.giverId,
                    date: data.date,
                    timeType: data.timeType,
                    
                  
                })
                resolve({
                    errCode: 0,
                    errMessange:'OK'
                })
            }
        } catch (error) {
            reject(error)
        }

    })

}


// let updateStatus = (data) => {
//     return new Promise(async (resolve, reject) =>{
//         console.log("check data",data)
//         try {
//             if(!data.id){
//                 resolve({
//                     errCode: 2,
//                     errMessage: 'Thiếu các thông số bắt buộc'
//                 })
//             }
//             else{
//                 let schedule = await db.Temp.findOne({
//                     where: {id: data.id},
//                     raw: false
//                 }) 
//                 console.log("check schedule",schedule)
//                 if (schedule) {
//                     schedule.statusType = data.status,
//                     await schedule.save();
//                     resolve({
//                         errCode: 0,
//                         errMessange: 'Sản phẩm đã được cập nhật thành công '
//                     });
//                 }else {
//                     resolve({
//                         errCode: 1,
//                         errMessange: 'Không tìm thấy sản phẩm'
//                     });
//                 }              
                
//             }
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

let getAllTemps = (giverId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let temps = '';
            if(giverId) {
                temps = await db.Temp.findAll({
                    where: { giverId: giverId},
                    include:[
                        {
                            model: db.User, as: 'giverTemp',
                        },
                        {
                            model: db.Product , as: 'productTemp'
                        },
                        {
                            model: db.Allcode , as: 'timeTypeTemp'
                        },
                        {
                            model: db.Allcode , as: 'statusTypeTemp'
                        },
                    ],
                    
                    raw: true,
                    nest: true
                    
                   
                   
                })
            }
            resolve(temps)
        }catch(e) {
            reject(e)
        }
    })
}

let deleteTemp = (tempId) =>
{
    return new Promise(async(resolve, reject) =>{
        
       let foundTemp = await db.Temp.findOne({
            where: {id: tempId}
        })
            if(!foundTemp)
            {
                resolve({
                    errCode: 2,
                        errMessage: "không có người dùng này"
                })
            }
            
            await db.Temp.destroy({
                where: {id: tempId}
            });
            resolve({
                errCode: 0,
                errMessage: "Thành Công"
            })
    })
}
module.exports ={
    checkProduct: checkProduct,
    createNewTemp: createNewTemp,
    getAllTemps: getAllTemps,
    deleteTemp: deleteTemp
    // updateStatus:updateStatus
  
}