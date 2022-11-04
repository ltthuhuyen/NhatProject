import db from "../models/index";
import bcrypt from "bcryptjs";
// import { Model } from "sequelize/types";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

let getTimeSerVice = (timeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let time = "";
      if (!timeInput) {
        resolve({
          errCode: 1,
          errMessage: "Thiếu các thông số bắt buộc",
        });
      } else {
        time = await db.Allcode.findOne({
          where: { keyMap: timeInput },
        });
        resolve(time);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getTimeSerVice: getTimeSerVice,
};
