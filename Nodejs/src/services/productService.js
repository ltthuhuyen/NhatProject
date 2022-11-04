import db from "../models/index";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

let checkProduct = (check) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { product_name: check },
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

let createNewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkProduct(data.product_name);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessange: "Sản phẩm này đã tồn tại ",
        });
      } else if (!data.product_name || !data.image || !data.description) {
        resolve({
          errCode: 2,
          errMessange: "Vui lòng điền đầy đủ thông tin",
        });
      } else {
        await db.Product.create({
          product_name: data.product_name,
          image: data.image,
          description: data.description,
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

let getAllProducts = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = "";
      if (productId === "ALL") {
        products = await db.Product.findAll({});
      }
      if (productId && productId !== "ALL") {
        products = await db.Product.findOne({
          where: { id: productId },
        });
      }
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

let updateProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy sản phẩm",
        });
      } else if (!data.product_name || !data.image || !data.description) {
        resolve({
          errCode: 2,
          errMessange: "Vui lòng điền đầy đủ thông tin",
        });
      } else {
        let product = await db.Product.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (product) {
          (product.product_name = data.product_name),
            (product.image = data.image),
            (product.description = data.description);
          await product.save();
          resolve({
            errCode: 0,
            errMessange: "Sản phẩm đã được cập nhật thành công ",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundProduct = await db.Product.findOne({
      where: { id: id },
    });
    if (!foundProduct) {
      resolve({
        errCode: 1,
        errMessage: "Không tìm thấy sản phẩm",
      });
    } else {
      await db.Product.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        errMessage: "Xóa sản phẩm thành công",
      });
    }
  });
};

module.exports = {
  checkProduct: checkProduct,
  createNewProduct: createNewProduct,
  getAllProducts: getAllProducts,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
