import db from "../models/index";
import emailService from "./emailService";
import productService from "./productService";
import addressService from "./addressService";
import allCodeService from "./allCodeService";
const Sequelize = require("sequelize");
require("dotenv").config();

let countCollect = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let collects = "";
      if (id === "ALL") {
        collects = await db.Schedule.findAll({
          attributes: [[Sequelize.fn("count", Sequelize.col("id")), "count"]],
        });
      }
      resolve(collects);
    } catch (error) {
      reject(error);
    }
  });
};
let createNewSchedule = (data) => {
  console.log(data.arrSchedule);
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule) {
        resolve({
          errCode: 1,
          errMessage: "Vui lòng chọn đủ thông tin!",
        });
      } else {
        let schedule = data.arrSchedule;
        let product, date, time, address, amount;
        // console.log("product", product);
        // for (let i = 0; i < schedule.length; i++) {
        //   let productId = schedule[i].productId;
        //   product = await productService.getAllProducts(productId);
        //   let addressId = schedule[i].addressId;
        //   address = await addressService.getAllAddresses(addressId);
        //   date = schedule[i].date;
        //   let timeId = schedule[i].timeType;
        //   time = await allCodeService.getTimeSerVice(timeId);
        //   amount = schedule[i].amount;
        // }
        await db.Schedule.bulkCreate(schedule);

        // await emailService.sendEmail({
        //   reciverEmail: address.userData.email,
        //   giverName: address.userData.firstName + address.userData.lastName,
        //   productName: product.product_name,
        //   dateName: date,
        //   timeName: time.valueVi,
        //   amountName: amount,
        //   addressName:
        //     address.address_name +
        //     " - " +
        //     address.ward_name +
        //     " - " +
        //     address.district_name +
        //     " - " +
        //     address.city_name,

        //   redirectLink:
        //     "https://www.youtube.com/watch?v=0GL--Adfqhc&list=PLncHg6Kn2JT5-kzm53oVL5ZBAe-LTREGA&index=73&ab_channel=H%E1%BB%8FiD%C3%A2nIT",
        // });

        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateStatusS2 = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu các thông số bắt buộc",
        });
      } else {
        let schedule = await db.Schedule.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (schedule) {
          (schedule.statusType = "S2"), await schedule.save();
          resolve({
            errCode: 0,
            errMessange: "Đơn đã được cập nhật thành công ",
          });
        } else {
          resolve({
            errCode: 1,
            errMessange: "Không tìm thấy đơn",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateStatusS3 = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu các thông số bắt buộc",
        });
      } else {
        let schedule = await db.Schedule.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (schedule) {
          (schedule.statusType = "S3"), await schedule.save();
          resolve({
            errCode: 0,
            errMessange: "Đơn đã được cập nhật thành công ",
          });
        } else {
          resolve({
            errCode: 1,
            errMessange: "Không tìm thấy đơn",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateStatus = (data) => {
  console.log("data", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu các thông số bắt buộc",
        });
      } else {
        let schedule = await db.Schedule.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (schedule) {
          (schedule.statusType = data.status), await schedule.save();
          await updateReceivedDate({
            scheduleId: schedule.id,
            statusType: "Yes",
          });

          resolve({
            errCode: 0,
            errMessange: "Cập nhật trạng thái thành công",
          });
        } else {
          resolve({
            errCode: 1,
            errMessange: "Không tìm thấy sản phẩm",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateRegistrationStatus = (data) => {
  console.log("data", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu các thông số bắt buộc",
        });
      } else {
        let collect = await db.Collectionform.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (collect) {
          (collect.statusType = "Yes"), await collect.save();
          await updateStatusS3({
            id: collect.scheduleId,
          });
          console.log(collect.scheduleId);
          resolve({
            errCode: 0,
            errMessange: "Cập nhật trạng thái thành công",
          });
        } else {
          resolve({
            errCode: 1,
            errMessange: "Không tìm thấy đơn",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateReceivedDate = (data) => {
  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.scheduleId) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu các thông số bắt buộc",
        });
      } else {
        let collect = await db.Collectionform.findOne({
          where: {
            scheduleId: data.scheduleId,
            statusType: "Yes",
          },
          raw: false,
        });

        if (collect) {
          (collect.receivedDate = new Date()), await collect.save();
          resolve({
            errCode: 0,
            errMessange: "Cập nhật ngày nhận thành công",
          });
        } else {
          resolve({
            errCode: 1,
            errMessange: "Không tìm thấy",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  countCollect: countCollect,
  createNewSchedule: createNewSchedule,
  updateStatusS2: updateStatusS2,
  updateStatusS3: updateStatusS3,
  updateStatus: updateStatus,
  updateRegistrationStatus: updateRegistrationStatus,
  updateReceivedDate: updateReceivedDate,
};
