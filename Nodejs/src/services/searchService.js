import db from "../models/index";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import appointmentService from "./appointmentService";

let searchProduct = (search) => {
  console.log("search", search);
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findAll({
        where: {
          product_name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

// Tìm kiếm đơn thu gom theo địa chỉ
let searchCollectionByAddress = (search) => {
  console.log(search);
  return new Promise(async (resolve, reject) => {
    try {
      if (
        search.city_name &&
        search.district_name &&
        search.ward_name &&
        search.date === ""
      ) {
        let searchCollection = await db.Address.findAll({
          where: {
            city_name: {
              [Op.like]: `%${search.city_name}%`,
            },
            district_name: {
              [Op.like]: `%${search.district_name}%`,
            },
            ward_name: {
              [Op.like]: `%${search.ward_name}%`,
            },
          },
        });
        let arrAddress = [];
        let collectionForm;
        let arrCollectionFormByAddress = [];
        // đưa addressId vào mảng
        for (let i = 0; i < searchCollection.length; i++) {
          let addressId = searchCollection[i].id;
          arrAddress.push(addressId);
        }
        // lấy đơn thu gom theo từng addressId
        for (let i = 0; i < arrAddress.length; i++) {
          collectionForm = await appointmentService.getAllCollectsByAddress(
            arrAddress[i]
          );
          arrCollectionFormByAddress.push(...collectionForm);
        }
        resolve(arrCollectionFormByAddress);
      } else if (
        search.city_name &&
        search.district_name &&
        search.ward_name &&
        search.date
      ) {
        let searchCollection = await db.Address.findAll({
          where: {
            city_name: {
              [Op.like]: `%${search.city_name}%`,
            },
            district_name: {
              [Op.like]: `%${search.district_name}%`,
            },
            ward_name: {
              [Op.like]: `%${search.ward_name}%`,
            },
          },
        });
        let arrAddress = [];
        let collectionForm;
        let arrCollectionFormByAddress = [];
        // đưa addressId vào mảng
        for (let i = 0; i < searchCollection.length; i++) {
          let addressId = searchCollection[i].id;
          arrAddress.push(addressId);
        }
        // lấy đơn thu gom theo từng addressId
        for (let i = 0; i < arrAddress.length; i++) {
          collectionForm = await appointmentService.getAllCollectsByAddress(
            arrAddress[i]
          );
          arrCollectionFormByAddress.push(...collectionForm);
        }
        arrCollectionFormByAddress = arrCollectionFormByAddress.filter(
          (item) => item.date === search.date
        );

        resolve(arrCollectionFormByAddress);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Tìm kiếm đơn thu gom theo ngày
let searchCollectionByDate = (search) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchCollection = await db.Schedule.findAll({
        where: {
          date: {
            [Op.like]: `%${search.date}%`,
          },
          district_name: {
            [Op.like]: `%${search.district_name}%`,
          },
          ward_name: {
            [Op.like]: `%${search.ward_name}%`,
          },
        },
      });

      let arrAddress = [];
      let collectionForm;
      let arrCollectionFormByAddress = [];
      let arrCollectionFormByDate = [];
      let arrCollectionForm = [];
      // đưa addressId vào mảng
      for (let i = 0; i < searchCollection.length; i++) {
        let addressId = searchCollection[i].id;
        arrAddress.push(addressId);
      }
      // lấy đơn thu gom theo từng addressId
      for (let i = 0; i < arrAddress.length; i++) {
        collectionForm = await appointmentService.getAllCollectsByAddress(
          arrAddress[i]
        );
        arrCollectionFormByAddress.push(...collectionForm);
      }

      resolve(arrCollectionFormByAddress);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  searchProduct: searchProduct,
  searchCollectionByAddress: searchCollectionByAddress,
  searchCollectionByDate: searchCollectionByDate,
};
