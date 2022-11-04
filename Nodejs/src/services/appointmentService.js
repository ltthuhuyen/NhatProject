import db from "../models/index";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import appointmentService from "./appointmentService";

let getAllAppointments = (appointmentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (appointmentId === "ALL") {
        appointments = await db.Schedule.findAll({
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      if (appointmentId && appointmentId !== "ALL") {
        appointments = await db.Schedule.findOne({
          where: { id: appointmentId },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }
      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

// all đơn thu gom vừa mới tạo có status = 'chưa xác nhận'
let getAppointmentsNew = (appointmentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (appointmentId) {
        appointments = await db.Schedule.findAll({
          where: {
            statusType: "S1",
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }
      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentStatusS2 = (appointmentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (appointmentId) {
        appointments = await db.Schedule.findAll({
          where: {
            statusType: "S2",
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentStatusS3 = (appointmentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (appointmentId) {
        appointments = await db.Schedule.findAll({
          where: {
            statusType: "S3",
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentStatusS4 = (appointmentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (appointmentId) {
        appointments = await db.Schedule.findAll({
          where: {
            statusType: "S4",
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentStatusS5 = (appointmentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (appointmentId) {
        appointments = await db.Schedule.findAll({
          where: {
            statusType: "S5",
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }
      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfGiver = (giverId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (giverId) {
        appointments = await db.Schedule.findAll({
          where: { giverId: giverId },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfGiverStatusS1 = (giverId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (giverId) {
        appointments = await db.Schedule.findAll({
          where: {
            giverId: giverId,
            statusType: "S1",
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfGiverStatusS2 = (giverId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (giverId) {
        appointments = await db.Schedule.findAll({
          where: {
            giverId: giverId,
            statusType: "S2",
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfGiverStatusS3 = (giverId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (giverId) {
        appointments = await db.Schedule.findAll({
          where: {
            giverId: giverId,
            statusType: "S3",
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfGiverStatusS4 = (giverId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (giverId) {
        appointments = await db.Schedule.findAll({
          where: {
            giverId: giverId,
            statusType: "S4",
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfGiverStatusS5 = (giverId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (giverId) {
        appointments = await db.Schedule.findAll({
          where: {
            giverId: giverId,
            statusType: "S5",
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfRecipient = (recipientId) => {
  console.log("recipientId", recipientId);
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (recipientId) {
        appointments = await db.Schedule.findAll({
          where: { recipientId: recipientId },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfRecipientStatusS2 = (recipientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (recipientId) {
        appointments = await db.Schedule.findAll({
          where: { recipientId: recipientId, statusType: "S2" },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfRecipientStatusS3 = (recipientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (recipientId) {
        appointments = await db.Schedule.findAll({
          where: { recipientId: recipientId, statusType: "S3" },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfRecipientStatusS3ByCurrentDate = (collectionForm) => {
  console.log(collectionForm);
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (collectionForm.recipientId) {
        appointments = await db.Schedule.findAll({
          where: {
            recipientId: collectionForm.recipientId,
            statusType: "S3",
            date: {
              [Op.like]: `%${collectionForm.currentDate}%`,
            },
            // date: collectionForm.currentDate,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfRecipientStatusS4 = (recipientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (recipientId) {
        appointments = await db.Schedule.findAll({
          where: { recipientId: recipientId, statusType: "S4" },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointmentsOfRecipientStatusS5 = (recipientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (recipientId) {
        appointments = await db.Schedule.findAll({
          where: { recipientId: recipientId, statusType: "S5" },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      resolve(appointments);
    } catch (e) {
      reject(e);
    }
  });
};

// đơn thu gom theo địa chỉ
let getAllCollectsByAddress = (addressId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let collects = "";
      if (addressId === "ALL") {
        collects = await db.Schedule.findAll({
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      if (addressId && addressId !== "ALL") {
        collects = await db.Schedule.findAll({
          where: {
            addressId: addressId,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }
      resolve(collects);
    } catch (e) {
      reject(e);
    }
  });
};

// đơn thu gom theo ngày
let getAllCollectsByDate = (date) => {
  return new Promise(async (resolve, reject) => {
    try {
      let collects = "";
      if (date === "ALL") {
        collects = await db.Schedule.findAll({
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }

      if (date && date !== "ALL") {
        collects = await db.Schedule.findAll({
          where: {
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
            },
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Product,
              as: "productData",
            },
            {
              model: db.Address,
              as: "addressData",
            },
            {
              model: db.Allcode,
              as: "timeTypeData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
          ],

          raw: true,
          nest: true,
        });
      }
      resolve(collects);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllAppointments: getAllAppointments,
  getAppointmentsNew: getAppointmentsNew,
  getAppointmentStatusS2: getAppointmentStatusS2,
  getAppointmentStatusS3: getAppointmentStatusS3,
  getAppointmentStatusS4: getAppointmentStatusS4,
  getAppointmentStatusS5: getAppointmentStatusS5,
  getAppointmentsOfGiver: getAppointmentsOfGiver,
  getAppointmentsOfGiverStatusS1: getAppointmentsOfGiverStatusS1,
  getAppointmentsOfGiverStatusS2: getAppointmentsOfGiverStatusS2,
  getAppointmentsOfGiverStatusS3: getAppointmentsOfGiverStatusS3,
  getAppointmentsOfGiverStatusS4: getAppointmentsOfGiverStatusS4,
  getAppointmentsOfGiverStatusS5: getAppointmentsOfGiverStatusS5,
  getAppointmentsOfRecipient: getAppointmentsOfRecipient,
  getAppointmentsOfRecipientStatusS2: getAppointmentsOfRecipientStatusS2,
  getAppointmentsOfRecipientStatusS3: getAppointmentsOfRecipientStatusS3,
  getAppointmentsOfRecipientStatusS3ByCurrentDate:
    getAppointmentsOfRecipientStatusS3ByCurrentDate,
  getAppointmentsOfRecipientStatusS4: getAppointmentsOfRecipientStatusS4,
  getAppointmentsOfRecipientStatusS5: getAppointmentsOfRecipientStatusS5,
  getAllCollectsByAddress: getAllCollectsByAddress,
  getAllCollectsByDate: getAllCollectsByDate,
};
