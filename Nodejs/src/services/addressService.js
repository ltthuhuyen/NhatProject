import db from "../models/index";
import bcrypt from "bcryptjs";

let createNewAddress = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.address_name ||
        !data.ward_name ||
        !data.district_name ||
        !data.city_name
      ) {
        resolve({
          errCode: 1,
          errMessange: "Thiếu thông tin",
        });
      } else {
        await db.Address.create({
          userId: data.giverId,
          address_name: data.address_name,
          ward_name: data.ward_name,
          district_name: data.district_name,
          city_name: data.city_name,
        });
      }
      resolve({
        errCode: 0,
        errMessange: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllAddresses = (addressId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let addresses = "";
      if (addressId === "ALL") {
        addresses = await db.Address.findAll({
          include: [
            {
              model: db.User,
              as: "userData",
            },
          ],
          raw: true,
          nest: true,
        });
      }
      if (addressId && addressId !== "ALL") {
        addresses = await db.Address.findOne({
          where: { id: addressId },
          include: [
            {
              model: db.User,
              as: "userData",
            },
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(addresses);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllAddressesOfUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let addresses = "";
      if (userId) {
        addresses = await db.Address.findAll({
          where: { userId: userId },
          include: [
            {
              model: db.User,
              as: "userData",
            },
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(addresses);
    } catch (e) {
      reject(e);
    }
  });
};

let updateAddressInfo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy người dùng",
        });
      } else if (
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
        if (address) {
          (address.address_name = data.address_name),
            (address.ward_name = data.ward_name),
            (address.district_name = data.district_name),
            (address.city_name = data.city_name),
            await address.save();
        }
        resolve({
          errCode: 0,
          errMessange: "Địa chỉ đã được cập nhật thành công ",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteAddress = (addressId) => {
  return new Promise(async (resolve, reject) => {
    let foundAddress = await db.Address.findOne({
      where: { id: addressId },
    });

    if (!foundAddress) {
      resolve({
        errCode: 1,
        errMessage: "Không tìm thấy địa chỉ",
      });
    }

    await db.Address.destroy({
      where: { id: addressId },
    });
    resolve({
      errCode: 0,
      errMessage: "Xóa thành công",
    });
  });
};

module.exports = {
  createNewAddress: createNewAddress,
  getAllAddresses: getAllAddresses,
  getAllAddressesOfUser: getAllAddressesOfUser,
  updateAddressInfo: updateAddressInfo,
  deleteAddress: deleteAddress,
};
