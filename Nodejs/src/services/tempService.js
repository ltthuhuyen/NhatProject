import db from "../models/index";

let checkProduct = (productId, giverId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Temp.findOne({
        where: {
          productId: productId,
          giverId: giverId,
        },
      });
      if (product) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewTemp = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkProduct(data.productId, data.giverId);
      if (check == true) {
        resolve({
          errCode: 1,
          errMessange: "Sản phẩm này đã có đơn thu gom",
        });
      } else if (!data.productId || !data.giverId) {
        resolve({
          errCode: 1,
          errMessange: "Vui lòng nhập đủ thông tin",
        });
      } else {
        await db.Temp.create({
          productId: data.productId,
          giverId: data.giverId,
          addressId: data.addressId,
          recipientId: "",
          date: data.date,
          timeType: data.timeType,
        });
        resolve({
          errCode: 0,
          errMessange: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

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
  return new Promise(async (resolve, reject) => {
    try {
      let temps = "";
      if (giverId) {
        temps = await db.Temp.findAll({
          where: { giverId: giverId },
          include: [
            {
              model: db.User,
              as: "giverTemp",
            },
            {
              model: db.Product,
              as: "productTemp",
            },
            {
              model: db.Allcode,
              as: "timeTypeTemp",
            },
            {
              model: db.Allcode,
              as: "statusTypeTemp",
            },
          ],

          raw: true,
          nest: true,
        });
      }
      resolve(temps);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteProductInTemp = (productId) => {
  return new Promise(async (resolve, reject) => {
    let foundProduct = await db.Temp.findOne({
      where: { productId: productId },
    });
    if (!foundProduct) {
      resolve({
        errCode: 2,
        errMessage: "Không có sản phẩm này",
      });
    }

    await db.Temp.destroy({
      where: { productId: productId },
    });
    resolve({
      errCode: 0,
      errMessage: "Xóa thành Công",
    });
  });
};

let deleteAllTempOfGiver = (giverId) => {
  return new Promise(async (resolve, reject) => {
    let foundTemp = await db.Temp.findAll({
      where: {
        giverId: giverId,
      },
    });
    if (!foundTemp) {
      resolve({
        errCode: 2,
        errMessage: "Không có sản phẩm nào thu gom của người dùng này",
      });
    }

    await db.Temp.destroy({
      where: {
        giverId: giverId,
      },
    });
    resolve({
      errCode: 0,
      errMessage: "Xóa thành Công",
    });
  });
};
module.exports = {
  checkProduct: checkProduct,
  createNewTemp: createNewTemp,
  getAllTemps: getAllTemps,
  deleteProductInTemp: deleteProductInTemp,
  deleteAllTempOfGiver: deleteAllTempOfGiver,
  // updateStatus:updateStatus
};
