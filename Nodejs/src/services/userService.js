import db from "../models/index";
import bcrypt, { compare } from "bcryptjs";
import emailService from "./emailService";
// import cryptoRandomString from "crypto-random-string";
var crypto = require("crypto");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          // attributes: ['id','email','firstName', 'lastName', 'roleId', 'password'],
          where: { email: email },
          raw: true,
        });
        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            (userData.errMessage = "Ok"), delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Mật khẩu không đúng";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "Không tìm thấy người dùng này";
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage =
          "Email vừa nhập không tồn tại, vui lòng nhập lại !";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let handleSendEmailForgotPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!email) {
      } else {
        var fpSalt = crypto.randomBytes(4).toString("hex");
        let hashPasswordFromBcrypt = await hashUserPassword(fpSalt);
        let user = await db.User.findOne({
          where: { email: email },
          raw: false,
        });
        if (user) {
          user.password = hashPasswordFromBcrypt;
          await user.save();
          await emailService.sendEmailForgotPassword({
            reciverEmail: email,
            newPassword: fpSalt,
          });
        }
      }
      resolve(email);
    } catch (e) {
      reject(e);
    }
  });
};

let handleChangePassword = (email, password, new_password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          raw: false,
        });
        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password);
          if (check === true) {
            let hashPasswordFromBcrypt = await hashUserPassword(new_password);
            user.password = hashPasswordFromBcrypt;
            await user.save();
            resolve({
              errCode: 0,
              errMessange: "Thay đổi mật khẩu thành công",
            });
          } else {
            resolve({
              errCode: 1,
              errMessange: "Mật khẩu không trùng khớp",
            });
          }
        } else {
          // userData.errCode = 2;
          // userData.errMessage = `Không tìm thấy người dùng`;
        }
      } else {
        // userData.errCode = 1;
        // userData.errMessage = `Không tìm thấy email`;
      }
      resolve(isExist);
    } catch (e) {
      reject(e);
    }
  });
};

let countUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "ALL") {
        users = await db.User.findAll({
          attributes: [[Sequelize.fn("count", Sequelize.col("id")), "count"]],
        });
      }

      // if (competitionId && competitionId !== "ALL") {
      //   users = await db.Submission.findAll({
      //     where: { competitionId: competitionId },
      //     group: "competitionId",
      //     attributes: [
      //       "competitionId",
      //       [Sequelize.fn("count", Sequelize.col("id")), "count"],
      //     ],
      //   });
      // }

      // let users = await db.Submission.findAll({
      //     group: "competitionId",
      //     attributes: [
      //     "competitionId",
      //     [Sequelize.fn("count", Sequelize.col("id")), "count"],
      //     ],
      // });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let searchUser = (search) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll({
        where: {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
        include: [
          {
            model: db.Allcode,
            as: "roleIdData",
            attributes: ["valueVi", "valueEn"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueVi", "valueEn"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          include: [
            {
              model: db.Allcode,
              as: "roleIdData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.Allcode,
              as: "genderData",
              attributes: ["valueVi", "valueEn"],
            },
          ],
          raw: true,
          nest: true,
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          include: [
            {
              model: db.Allcode,
              as: "roleIdData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.Allcode,
              as: "genderData",
              attributes: ["valueVi", "valueEn"],
            },
          ],
          raw: true,
          nest: true,
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getRoleID = (role) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      users = await db.User.findAll({
        where: { roleId: role },
        include: [
          {
            model: db.Allcode,
            as: "roleIdData",
            attributes: ["valueVi", "valueEn"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueVi", "valueEn"],
          },
        ],
        raw: true,
        nest: true,
        attributes: {
          exclude: ["password"],
        },
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessange: "Email này đã tồn tại ",
        });
      } else if (
        !data.email ||
        !data.password ||
        !data.firstName ||
        !data.lastName ||
        !data.phone ||
        !data.gender ||
        !data.roleId ||
        !data.address_name ||
        !data.ward_name ||
        !data.district_name ||
        !data.city_name
      ) {
        resolve({
          errCode: 2,
          errMessange: "Vui lòng điền đầy đủ thông tin",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        let user = await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          gender: data.gender,
          roleId: data.roleId,
          image: data.image,
        });
        await db.Address.create({
          userId: user.id,
          address_name: data.address_name,
          ward_name: data.ward_name,
          district_name: data.district_name,
          city_name: data.city_name,
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

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy người dùng",
        });
      } else if (
        !data.email ||
        !data.password ||
        !data.firstName ||
        !data.lastName ||
        !data.phone ||
        !data.gender ||
        !data.roleId ||
        !data.address_name ||
        !data.ward_name ||
        !data.district_name ||
        !data.city_name
      ) {
        resolve({
          errCode: 2,
          errMessange: "Vui lòng điền đầy đủ thông tin",
        });
      } else {
        let address = await db.Address.findOne({
          where: { id: data.id },
          raw: false,
        });
        let user = await db.User.findOne({
          where: { id: address.userId },
          raw: false,
        });
        if (user) {
          (user.firstName = data.firstName),
            (user.lastName = data.lastName),
            (user.phone = data.phone),
            (user.gender = data.gender),
            (user.roleId = data.roleId),
            (user.image = data.image),
            await user.save();
        }
        if (address) {
          address.userId = data.userId;
          (address.city_name = data.city_name),
            (address.district_name = data.district_name),
            (address.ward_name = data.ward_name);
          address.address_name = data.address_name;
          await address.save();
        }

        resolve({
          errCode: 0,
          errMessange: "Người dùng đã được cập nhật thành công ",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserInfo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy người dùng",
        });
      } else if (
        !data.email ||
        !data.password ||
        !data.firstName ||
        !data.lastName ||
        !data.phone ||
        !data.gender
      ) {
        resolve({
          errCode: 2,
          errMessange: "Vui lòng điền đầy đủ thông tin",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (user) {
          let hashPasswordFromBcrypt = await hashUserPassword(data.password);
          (user.email = data.email),
            (user.password = hashPasswordFromBcrypt),
            (user.firstName = data.firstName),
            (user.lastName = data.lastName),
            (user.phone = data.phone),
            (user.gender = data.gender),
            // (user.image = data.image),
            await user.save();
        }
        resolve({
          errCode: 0,
          errMessange: "Người dùng đã được cập nhật thành công ",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });
    let foundAddress = await db.Address.findAll({
      where: { userId: userId },
    });
    if (!foundUser) {
      resolve({
        errCode: 1,
        errMessage: "Không Tìm thấy người dùng",
      });
    } else {
      let user = await db.User.destroy({
        where: { id: userId },
      });
      let address = await db.Address.destroy({
        where: { userId: userId },
      });
      resolve({
        errCode: 0,
        errMessage: "Xóa người dùng thành công",
      });
    }
  });
};

let getAllCodeSerVice = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Thiếu các thông số bắt buộc",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let userStatistic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let userThisMonth = {};
      var today = new Date();
      var currentDate =
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2);
      console.log("currentDate", currentDate);
      let todayLastMonth = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
      var dayLastMonth =
        todayLastMonth.getFullYear() +
        "-" +
        ("0" + (todayLastMonth.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + todayLastMonth.getDate()).slice(-2);
      console.log(dayLastMonth);
      let todayLastMonth2 = new Date(new Date() - 2 * 30 * 24 * 60 * 60 * 1000);
      var dayLastMonth2 =
        todayLastMonth2.getFullYear() +
        "-" +
        ("0" + (todayLastMonth2.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + todayLastMonth2.getDate()).slice(-2);
      console.log("dayLastMonth2", dayLastMonth2);
      console.log(new Date());
      userThisMonth = await db.User.findAll({
        where: {
          createdAt: {
            [Op.lte]: currentDate,
            [Op.gte]: dayLastMonth,
          },
        },
      });
      let userLastMonth = {};
      userLastMonth = await db.User.findAll({
        where: {
          createdAt: {
            [Op.lte]: dayLastMonth,
            [Op.gte]: dayLastMonth2,
          },
        },
      });
      let all = await db.User.findAll();
      const tong = userLastMonth.length + userThisMonth.length;
      const truoc = userLastMonth.length / tong;
      const nay = userThisMonth.length / tong;
      let tang;
      let phantramTang;
      if (truoc > nay) {
        tang = false;
        let phanTrang = (truoc - nay) * 100;
        phantramTang = phanTrang.toFixed(0);
      } else {
        tang = true;
        let phanTrang = (nay - truoc) * 100;
        phantramTang = phanTrang.toFixed(0);
      }
      const allUsers = all.length;
      const users = {
        allUsers,
        phantramTang,
        tang,
      };
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  handleSendEmailForgotPassword: handleSendEmailForgotPassword,
  handleChangePassword: handleChangePassword,
  searchUser: searchUser,
  getAllUsers: getAllUsers,
  hashUserPassword: hashUserPassword,
  createNewUser: createNewUser,
  updateUser: updateUser,
  updateUserInfo: updateUserInfo,
  deleteUser: deleteUser,
  getAllCodeSerVice: getAllCodeSerVice,
  getRoleID: getRoleID,
  countUser: countUser,
  userStatistic: userStatistic,
};
