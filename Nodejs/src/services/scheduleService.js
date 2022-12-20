import db from "../models/index";
import emailService from "./emailService";
import productService from "./productService";
import addressService from "./addressService";
import allCodeService from "./allCodeService";
import appointmentService from "./appointmentService";
import tempService from "./tempService";
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
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          errMessage: "Vui lòng chọn đủ thông tin!",
        });
      } else {
        let temp = await tempService.getAllTemps(data.giverId);

        if (temp && temp.length > 0) {
          let arr = [];
          temp.map(async (item, index) => {
            let obj = {};
            (obj.giverId = data.giverId), (obj.addressId = data.addressId);
            (obj.productId = item.productId),
              (obj.date = data.date),
              (obj.timeType = data.timeType),
              (obj.amount = data.amount),
              (obj.statusType = data.statusType);
            arr.push(obj);
          });

          let schedule = await db.Schedule.bulkCreate(arr);
          resolve({
            errCode: 0,
            errMessage: "OK",
          });
        }

        for (let i = 0; i < schedule.length; i++) {
          let productId = schedule[i].productId;
          product = await productService.getAllProducts(productId);
          let addressId = schedule[i].addressId;
          address = await addressService.getAllAddresses(addressId);
          date = schedule[i].date;
          let timeId = schedule[i].timeType;
          time = await allCodeService.getTimeSerVice(timeId);
          amount = schedule[i].amount;
        }
        await emailService.sendEmail({
          reciverEmail: address.userData.email,
          giverName: address.userData.firstName + address.userData.lastName,
          productName: product.product_name,
          dateName: date,
          timeName: time.valueVi,
          amountName: amount,
          addressName:
            address.address_name +
            " - " +
            address.ward_name +
            " - " +
            address.district_name +
            " - " +
            address.city_name,
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
            scheduleId: data.id,
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
  console.log("data1", data);
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
        console.log("collect", collect);
        if (collect) {
          (collect.statusType = "Yes"), await collect.save();
          await updateStatusS3({
            id: collect.scheduleId,
          });

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

// Cập nhật trạng thái đơn thu gom bị hết hạn => status = 'S5'
let updateStatusExpire = () => {
  return new Promise(async (resolve, reject) => {
    let res = await appointmentService.getAllAppointmentsExpire("ALL");
    // console.log("res.appointments", res);
    try {
      if (res && res.appointments) {
        console.log("res.appointments", res.appointments);
        for (let i = 0; i < res.appointments.length; i++) {
          await updateStatus({
            id: res.appointments[i].id,
            status: "S5",
          });
          resolve({
            errCode: 0,
            errMessange: "Cập nhật trạng thái thành công",
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
  updateStatusExpire: updateStatusExpire,
};
