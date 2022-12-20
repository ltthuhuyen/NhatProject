import db from "../models/index";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import moment from "moment";
import scheduleService from "./scheduleService";

let getAllSchedules = (appointmentId) => {
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
              as: "statusData",
            },
          ],

          raw: true,
          nest: true,
        });
      }
      if (appointmentId && appointmentId !== "ALL") {
        console.log("appointmentId", appointmentId);
        appointments = await db.Schedule.findOne({
          where: { id: appointmentId },
          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
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

let getAllAppointments = (appointment) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (appointment === "ALL") {
        appointments = await db.Collectionform.findAll({
          include: [
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Allcode,
              as: "statusTypeData",
            },
            {
              model: db.Schedule,
              as: "scheduleData",
              include: [
                {
                  model: db.User,
                  as: "giverData",
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
                  as: "statusData",
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
      }
      if (appointment && appointment !== "ALL") {
        appointments = await db.Collectionform.findOne({
          where: { id: appointment },

          include: [
            {
              model: db.User,
              as: "recipientData",
            },

            {
              model: db.Schedule,
              as: "scheduleData",
              include: [
                {
                  model: db.User,
                  as: "giverData",
                },
                {
                  model: db.Address,
                  as: "addressData",
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
                  as: "statusData",
                },
              ],
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

// all đơn thu gom theo trang thái
let getScheduleByStatus = (status) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";

      if (status) {
        appointments = await db.Schedule.findAll({
          where: {
            statusType: status,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
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

let getScheduleBetweenTwoStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";

      if (data) {
        appointments = await db.Schedule.findAll({
          where: {
            statusType: {
              [Op.or]: [data.status1, data.status2],
            },
          },

          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
            },
          ],

          raw: true,
          nest: true,
        });
        for (let i = 0; i < appointments.length; i++) {
          let check = await db.Collectionform.count({
            where: { scheduleId: appointments[i].id },
          });
          console.log("============> check", check);
          appointments[i].soluongdangky = check;
        }

        resolve(appointments);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleOfGiver = (schedule) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (schedule.giverId && !schedule.status) {
        appointments = await db.Schedule.findAll({
          where: {
            giverId: schedule.giverId,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
            },
          ],
          raw: true,
          nest: true,
        });
      } else if (schedule.giverId && schedule.status) {
        appointments = await db.Schedule.findAll({
          where: {
            giverId: schedule.giverId,
            statusType: schedule.status,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
            },
          ],
          raw: true,
          nest: true,
        });
      } else if (schedule.giverId && schedule.status) {
        appointments = await db.Schedule.findAll({
          where: {
            giverId: schedule.giverId,
            statusType: schedule.status,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
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

let getAllAppointmentsByScheduleByStatusByReceivedDate = (appointment) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (
        appointment.scheduleId &&
        !appointment.recipientId &&
        !appointment.status &&
        !appointment.receivedDate
      ) {
        appointments = await db.Collectionform.findAll({
          where: {
            scheduleId: appointment.scheduleId,
          },

          include: [
            {
              model: db.User,
              as: "recipientData",
              include: [
                {
                  model: db.Address,
                  as: "userData",
                },
              ],
            },

            {
              model: db.Schedule,
              as: "scheduleData",
              include: [
                {
                  model: db.User,
                  as: "giverData",
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
                  as: "statusData",
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
      } else if (
        appointment.scheduleId &&
        appointment.recipientId &&
        !appointment.status &&
        !appointment.receivedDate
      ) {
        appointments = await db.Collectionform.findOne({
          where: {
            scheduleId: appointment.scheduleId,
            recipientId: appointment.recipientId,
          },

          include: [
            {
              model: db.User,
              as: "recipientData",
            },

            {
              model: db.Schedule,
              as: "scheduleData",
              include: [
                {
                  model: db.User,
                  as: "giverData",
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
                  as: "statusData",
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
      } else if (
        appointment.scheduleId &&
        !appointment.recipientId &&
        appointment.status &&
        !appointment.receivedDate
      ) {
        appointments = await db.Collectionform.findOne({
          where: {
            scheduleId: appointment.scheduleId,
            statusType: appointment.status,
          },

          include: [
            {
              model: db.User,
              as: "recipientData",
            },

            {
              model: db.Schedule,
              as: "scheduleData",
              include: [
                {
                  model: db.User,
                  as: "giverData",
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
                  as: "statusData",
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
      } else if (
        appointment.scheduleId &&
        appointment.recipientId &&
        appointment.status &&
        !appointment.receivedDate
      ) {
        // console.log("th1");
        appointments = await db.Collectionform.findOne({
          where: {
            scheduleId: appointment.scheduleId,
            recipientId: appointment.recipientId,
            statusType: appointment.status,
          },

          include: [
            {
              model: db.User,
              as: "recipientData",
            },

            {
              model: db.Schedule,
              as: "scheduleData",
              include: [
                {
                  model: db.User,
                  as: "giverData",
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
                  as: "statusData",
                },
              ],
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

// let getAppointmentsOfGiverStatusS1 = (giverId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (giverId) {
//         appointments = await db.Schedule.findAll({
//           where: {
//             giverId: giverId,
//             statusType: "S1",
//           },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let checkCollect = (check) => {
  return new Promise(async (resolve, reject) => {
    try {
      let collect = await db.Collectionform.findAll({
        where: {
          scheduleId: check.scheduleId,
          recipientId: check.recipientId,
        },
      });

      if (collect && collect.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let registerCollectionForm = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkCollect(data);

      if (check === true) {
        resolve({
          errCode: 1,
          errMessange: "Đăng kí này đã tồn tại ",
        });
      } else if (!data.scheduleId || !data.recipientId) {
        resolve({
          errCode: 2,
          errMessange: "Vui lòng điền đầy đủ thông tin",
        });
      } else {
        let collect = await db.Collectionform.create({
          scheduleId: data.scheduleId,
          recipientId: data.recipientId,
          receivedDate: data.receivedDate,
          registerDate: data.registerDate,
          statusType: "No",
        });
        if (collect) {
          let schedule = await db.Schedule.findOne({
            where: { id: collect.scheduleId },
            raw: false,
          });
          if (schedule) {
            (schedule.statusType = "S2"), await schedule.save();
          }
        }

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

// let getAppointmentsOfRecipientStatus = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (data.recipientId && !data.status) {
//         appointments = await db.Collectionform.findAll({
//           where: {
//             recipientId: data.recipientId,
//           },
//           include: [
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Schedule,
//               as: "scheduleData",
//               include: [
//                 {
//                   model: db.User,
//                   as: "giverData",
//                 },
//                 {
//                   model: db.Product,
//                   as: "productData",
//                 },
//                 {
//                   model: db.Allcode,
//                   as: "timeTypeData",
//                 },
//                 {
//                   model: db.Allcode,
//                   as: "statusData",
//                 },
//               ],
//             },
//           ],
//           raw: true,
//           nest: true,
//         });
//       } else if (data.recipientId && data.status) {
//         appointments = await db.Collectionform.findAll({
//           where: {
//             recipientId: data.recipientId,
//             statusType: data.status,
//           },
//           include: [
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Schedule,
//               as: "scheduleData",
//               include: [
//                 {
//                   model: db.User,
//                   as: "giverData",
//                 },
//                 {
//                   model: db.Product,
//                   as: "productData",
//                 },
//                 {
//                   model: db.Allcode,
//                   as: "timeTypeData",
//                 },
//                 {
//                   model: db.Allcode,
//                   as: "statusData",
//                 },
//               ],
//             },
//           ],
//           raw: true,
//           nest: true,
//         });
//       }
//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentStatusS2 = (appointmentId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (appointmentId) {
//         appointments = await db.Schedule.findAll({
//           where: {
//             statusType: "S2",
//           },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentStatusS3 = (appointmentId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (appointmentId) {
//         appointments = await db.Schedule.findAll({
//           where: {
//             statusType: "S3",
//           },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentStatusS4 = (appointmentId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (appointmentId) {
//         appointments = await db.Schedule.findAll({
//           where: {
//             statusType: "S4",
//           },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentStatusS5 = (appointmentId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (appointmentId) {
//         appointments = await db.Schedule.findAll({
//           where: {
//             statusType: "S5",
//           },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }
//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentsOfGiver = (giverId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (giverId) {
//         appointments = await db.Schedule.findAll({
//           where: { giverId: giverId },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentsOfGiverStatusS1 = (giverId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (giverId) {
//         appointments = await db.Schedule.findAll({
//           where: {
//             giverId: giverId,
//             statusType: "S1",
//           },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentsOfGiverStatusS2 = (giverId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (giverId) {
//         appointments = await db.Schedule.findAll({
//           where: {
//             giverId: giverId,
//             statusType: "S2",
//           },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentsOfGiverStatusS3 = (giverId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (giverId) {
//         appointments = await db.Schedule.findAll({
//           where: {
//             giverId: giverId,
//             statusType: "S3",
//           },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentsOfGiverStatusS4 = (giverId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (giverId) {
//         appointments = await db.Schedule.findAll({
//           where: {
//             giverId: giverId,
//             statusType: "S4",
//           },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentsOfGiverStatusS5 = (giverId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (giverId) {
//         appointments = await db.Schedule.findAll({
//           where: {
//             giverId: giverId,
//             statusType: "S5",
//           },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentsOfRecipient = (recipientId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (recipientId) {
//         appointments = await db.Schedule.findAll({
//           where: { recipientId: recipientId },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentsOfRecipientStatusS2 = (recipientId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (recipientId) {
//         appointments = await db.Schedule.findAll({
//           where: { recipientId: recipientId, statusType: "S2" },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentsOfRecipientStatusS3 = (recipientId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (recipientId) {
//         appointments = await db.Schedule.findAll({
//           where: { recipientId: recipientId, statusType: "S3" },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentsOfRecipientStatusS3ByCurrentDate = (collectionForm) => {
//   console.log(collectionForm);
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (collectionForm.recipientId) {
//         appointments = await db.Schedule.findAll({
//           where: {
//             recipientId: collectionForm.recipientId,
//             statusType: "S3",
//             date: {
//               [Op.lte]: collectionForm.currentDate,
//             },
//             // date: collectionForm.currentDate,
//           },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAppointmentsOfRecipientStatusS4 = (recipientId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointments = "";
//       if (recipientId) {
//         appointments = await db.Schedule.findAll({
//           where: { recipientId: recipientId, statusType: "S4" },
//           include: [
//             {
//               model: db.User,
//               as: "giverData",
//             },
//             {
//               model: db.User,
//               as: "recipientData",
//             },
//             {
//               model: db.Product,
//               as: "productData",
//             },
//             {
//               model: db.Address,
//               as: "addressData",
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeData",
//             },
//             {
//               model: db.Allcode,
//               as: "statusTypeData",
//             },
//           ],

//           raw: true,
//           nest: true,
//         });
//       }

//       resolve(appointments);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// Đơn thu gom theo địa chỉ
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
              as: "statusData",
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
            statusType: {
              [Op.or]: ["S1", "S2"],
            },
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
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

let getAllCollectsByDate = (collectForm) => {
  return new Promise(async (resolve, reject) => {
    try {
      let collects = "";
      if (collectForm.date && !collectForm.status && !collectForm.recipientId) {
        collects = await db.Schedule.findAll({
          where: {
            date: collectForm.date,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
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
      } else if (
        collectForm.date &&
        collectForm.status &&
        !collectForm.recipientId
      ) {
        collects = await db.Schedule.findAll({
          where: {
            date: collectForm.date,
            statusType: collectForm.status,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
            },
          ],

          raw: true,
          nest: true,
        });
      } else if (
        collectForm.date &&
        collectForm.status &&
        collectForm.recipientId
      ) {
        collects = await db.Schedule.findAll({
          where: {
            date: collectForm.date,
            statusType: collectForm.status,
            recipientId: collectForm.recipientId,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
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

// Đơn thu gom theo ngày hẹn thu gom
let getAllCollectsByAppointmentDate = (collectForm) => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedules = "";
      let collectsTemp = [];
      let collects = [];
      let today = moment(new Date()).format("DD/MM/YYYY");
      // console.log(today);
      if (collectForm.status && !collectForm.date) {
        schedules = await db.Schedule.findAll({
          where: {
            statusType: collectForm.status,
            date: today,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
            },
          ],

          raw: true,
          nest: true,
        });

        if (schedules && collectForm.recipientId) {
          for (let i = 0; i < schedules.length; i++) {
            let temp = await getAllAppointmentsByScheduleByStatusByReceivedDate(
              {
                scheduleId: schedules[i].id,
                recipientId: collectForm.recipientId,
              }
            );
            if (temp != null) {
              collectsTemp.push(temp);
              if (collectsTemp) {
                collects = collectsTemp.filter(
                  (collectsTemp) => collectsTemp.statusType === "Yes"
                );
              }
            }
          }
        }
      } else if (collectForm.status && collectForm.date) {
        // console.log("222");
        schedules = await db.Schedule.findAll({
          where: {
            statusType: collectForm.status,
            date: collectForm.date,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
            },
          ],

          raw: true,
          nest: true,
        });

        if (schedules && collectForm.recipientId) {
          for (let i = 0; i < schedules.length; i++) {
            let temp = await getAllAppointmentsByScheduleByStatusByReceivedDate(
              {
                scheduleId: schedules[i].id,
                recipientId: collectForm.recipientId,
              }
            );
            if (temp != null) {
              collectsTemp.push(temp);
              if (collectsTemp) {
                collects = collectsTemp.filter(
                  (collectsTemp) => collectsTemp.statusType === "Yes"
                );
              }
            }
          }
        }
      }
      resolve(collects);
    } catch (e) {
      reject(e);
    }
  });
};

// Đơn thu gom được tạo bởi ngày hiện tại theo từng trạng thái
let getAllAppointmentsStatusByCurrentDate = (collectionForm) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointments = "";
      if (collectionForm) {
        appointments = await db.Schedule.findAll({
          where: {
            createdAt: {
              [Op.gte]: collectionForm.currentDateBegin,
              [Op.lte]: collectionForm.currentDateStop,
            },

            statusType: collectionForm.status,
          },
          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
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

// Thống kê từ ngày ... đến ngày hiện tại
let collectFormStatisticByCurrentDate = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let collects = "";
      if (data.date && data.currentDate && !data.status) {
        collects = await db.Schedule.findAll({
          where: {
            receivedDate: {
              [Op.gte]: data.date,
              [Op.lte]: data.currentDate,
              // [Op.between]: [
              //   { createdAt: data.date },
              //   { createdAt: data.currentDate },
              // ],
            },
          },

          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
            },
          ],

          raw: true,
          nest: true,
        });
      } else if (data.date && data.currentDate && data.status) {
        collects = await db.Schedule.findAll({
          where: {
            receivedDate: {
              [Op.gte]: data.date,
              [Op.lte]: data.currentDate,
            },
            statusType: "",
          },

          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
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

// Thống kê đơn thu gom theo trạng thái tới ngày hiện tại
let collectFormStatisticByStatusOfCurrentDate = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let collects = "";
      let schedules = "";
      let arr = [];
      let today = moment(new Date()).format("YYYY-MM-DD");
      let todayTime = today + " " + "00:00:00";
      if (data.status) {
        schedules = await db.Schedule.findAll({
          where: {
            statusType: data.status,
          },

          include: [
            {
              model: db.User,
              as: "giverData",
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
              as: "statusData",
            },
          ],
          raw: true,
          nest: true,
        });

        if (schedules && data.dateTimeBegin) {
          for (let i = 0; i < schedules.length; i++) {
            let obj = {};
            collects = await db.Collectionform.findOne({
              where: {
                scheduleId: schedules[i].id,
                statusType: "Yes",
                receivedDate: {
                  [Op.gte]: data.dateTimeBegin,
                  [Op.lte]: new Date(),
                },
              },

              include: [
                {
                  model: db.User,
                  as: "recipientData",
                },
                {
                  model: db.Schedule,
                  as: "scheduleData",
                  include: [
                    {
                      model: db.User,
                      as: "giverData",
                    },
                    {
                      model: db.Address,
                      as: "addressData",
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
                      as: "statusData",
                    },
                  ],
                },
              ],
              raw: true,
              nest: true,
            });

            arr.push(collects);
          }
        }
      }

      resolve(arr);
    } catch (e) {
      reject(e);
    }
  });
};

let collectFormStatistic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let collectFormThisMonth = {};
      var today = new Date();
      var currentDate =
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2);

      let todayLastMonth = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
      var dayLastMonth =
        todayLastMonth.getFullYear() +
        "-" +
        ("0" + (todayLastMonth.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + todayLastMonth.getDate()).slice(-2);

      let todayLastMonth2 = new Date(new Date() - 2 * 30 * 24 * 60 * 60 * 1000);
      var dayLastMonth2 =
        todayLastMonth2.getFullYear() +
        "-" +
        ("0" + (todayLastMonth2.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + todayLastMonth2.getDate()).slice(-2);

      collectFormThisMonth = await db.Schedule.findAll({
        where: {
          createdAt: {
            [Op.lte]: currentDate,
            [Op.gte]: dayLastMonth,
          },
        },
        include: [
          {
            model: db.User,
            as: "giverData",
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
            as: "statusData",
          },
        ],
        raw: true,
        nest: true,
      });
      let collectFormLastMonth = {};
      collectFormLastMonth = await db.Schedule.findAll({
        where: {
          createdAt: {
            [Op.lte]: dayLastMonth,
            [Op.gte]: dayLastMonth2,
          },
        },
        include: [
          {
            model: db.User,
            as: "giverData",
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
            as: "statusData",
          },
        ],
        raw: true,
        nest: true,
      });
      let all = await db.Schedule.findAll();
      const tong = collectFormLastMonth.length + collectFormThisMonth.length;
      const truoc = collectFormLastMonth.length / tong;
      const nay = collectFormThisMonth.length / tong;
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
      const allCollecsForm = all.length;
      const collects = {
        allCollecsForm,
        phantramTang,
        tang,
      };
      resolve(collects);
    } catch (e) {
      reject(e);
    }
  });
};

let getThongketheotuan = (week) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (week == 1) {
        let arr = [];

        for (let i = 0; i < 7; i++) {
          let obj = {};
          obj.value = moment(new Date())
            .subtract(i, "days")
            .startOf("day")
            .format("YYYY/MM/DD");
          // .valueOf();

          arr.push(obj.value);
        }
        let collects = await db.Collectionform.findAll({
          where: { statusType: "Yes" },
          include: [
            {
              model: db.User,
              as: "recipientData",
            },
            {
              model: db.Schedule,
              as: "scheduleData",
              where: { statusType: "S4" },
            },
          ],
          raw: true,
          nest: true,
        });
        let temp = moment(new Date(collects[0].receivedDate).getTime()).format(
          "YYYY/MM/DD"
        );
        // resolve(collects);

        let arrCount = [];
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];
        let arr6 = [];
        let arr7 = [];
        for (let y = 0; y < collects.length; y++) {
          if (
            moment(new Date(collects[y]?.receivedDate).getTime()).format(
              "YYYY/MM/DD"
            ) == arr[0]
          ) {
            let obj = {};
            (obj = collects[y].id), arr1.push(obj);
          }
          if (
            moment(new Date(collects[y]?.receivedDate).getTime()).format(
              "YYYY/MM/DD"
            ) == arr[1]
          ) {
            let obj = {};
            (obj = collects[y].id), arr2.push(obj);
          }
          if (
            moment(new Date(collects[y]?.receivedDate).getTime()).format(
              "YYYY/MM/DD"
            ) == arr[2]
          ) {
            let obj = {};
            (obj = collects[y].id), arr3.push(obj);
          }
          if (
            moment(new Date(collects[y]?.receivedDate).getTime()).format(
              "YYYY/MM/DD"
            ) == arr[3]
          ) {
            let obj = {};
            (obj = collects[y].id), arr4.push(obj);
          }
          if (
            moment(new Date(collects[y]?.receivedDate).getTime()).format(
              "YYYY/MM/DD"
            ) == arr[4]
          ) {
            let obj = {};
            (obj = collects[y].id), arr5.push(obj);
          }
          if (
            moment(new Date(collects[y]?.receivedDate).getTime()).format(
              "YYYY/MM/DD"
            ) == arr[5]
          ) {
            let obj = {};
            (obj = collects[y].id), arr6.push(obj);
          }
          if (
            moment(new Date(collects[y]?.receivedDate).getTime()).format(
              "YYYY/MM/DD"
            ) == arr[6]
          ) {
            let obj = {};
            (obj = collects[y].id), arr7.push(obj);
          }
        }
        resolve({
          data: [
            arr1.length,
            arr2.length,
            arr3.length,
            arr4.length,
            arr5.length,
            arr6.length,
            arr7.length,
          ],
        });
      }
      // else if (week == 2) {
      //   let arr = [];
      //   let arr2 = [];

      //   for (let i = 0; i < 7; i++) {
      //     let obj = {};
      //     obj.value = moment(new Date())
      //       .subtract(i + 1, "days")
      //       .startOf("day")
      //       .valueOf();
      //     arr.push(obj.value);
      //   }

      //   for (let i = 0; i < 7; i++) {
      //     let obj = {};
      //     obj.value = moment(new Date())
      //       .subtract(i + 8, "days")
      //       .startOf("day")
      //       .valueOf();
      //     arr2.push(obj.value);
      //   }

      //   let arrCount = [];
      //   for (let i = 0; i < arr.length; i++) {
      //     let dem = await db.Schedule.count({
      //       where: { date: arr[i], statusType: "S4" },
      //     });
      //     arrCount.push(dem);
      //   }

      //   let arrCount2 = [];
      //   for (let i = 0; i < arr2.length; i++) {
      //     let dem = await db.Schedule.count({
      //       where: { date: arr[i], statusType: "S4" },
      //     });
      //     arrCount2.push(dem);
      //   }

      //   resolve([arrCount, arrCount2]);
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllAppointmentsExpire = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrCollectStatusS3 = "";
      let status = "S3";
      let today = new Date();
      let currentDate = moment(today);
      let arrCollectExpire = [];
      arrCollectStatusS3 = await getScheduleByStatus(status);
      for (let i = 0; i < arrCollectStatusS3.length; i++) {
        currentDate = moment(currentDate);
        let date = moment(`${arrCollectStatusS3[i].date}`, "DD/MM/YYYY");
        if (currentDate.diff(date, "days") >= 5) {
          arrCollectExpire.push(arrCollectStatusS3[i]);
        }
      }
      if (arrCollectExpire) {
        for (let i = 0; i < arrCollectExpire.length; i++) {
          let schedule = await db.Schedule.findOne({
            where: { id: arrCollectExpire[i].id },
            raw: false,
          });
          if (schedule) {
            schedule.statusType = "S5";
            await schedule.save();
          }
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllSchedules: getAllSchedules,
  getAllAppointments: getAllAppointments,
  getScheduleByStatus: getScheduleByStatus,
  getScheduleBetweenTwoStatus: getScheduleBetweenTwoStatus,
  getAllAppointmentsByScheduleByStatusByReceivedDate:
    getAllAppointmentsByScheduleByStatusByReceivedDate,
  checkCollect: checkCollect,
  registerCollectionForm: registerCollectionForm,
  getScheduleOfGiver: getScheduleOfGiver,
  // getAppointmentsOfRecipientStatus: getAppointmentsOfRecipientStatus,
  collectFormStatisticByStatusOfCurrentDate:
    collectFormStatisticByStatusOfCurrentDate,
  // getAppointmentsNew: getAppointmentsNew,
  // getAppointmentStatusS2: getAppointmentStatusS2,
  // getAppointmentStatusS3: getAppointmentStatusS3,
  // getAppointmentStatusS4: getAppointmentStatusS4,
  // getAppointmentStatusS5: getAppointmentStatusS5,
  // getAppointmentsOfGiver: getAppointmentsOfGiver,
  // getAppointmentsOfGiverStatusS1: getAppointmentsOfGiverStatusS1,
  // getAppointmentsOfGiverStatusS2: getAppointmentsOfGiverStatusS2,
  // getAppointmentsOfGiverStatusS3: getAppointmentsOfGiverStatusS3,
  // getAppointmentsOfGiverStatusS4: getAppointmentsOfGiverStatusS4,
  // getAppointmentsOfGiverStatusS5: getAppointmentsOfGiverStatusS5,
  // getAppointmentsOfRecipient: getAppointmentsOfRecipient,
  // getAppointmentsOfRecipientStatusS2: getAppointmentsOfRecipientStatusS2,
  // getAppointmentsOfRecipientStatusS3: getAppointmentsOfRecipientStatusS3,
  // getAppointmentsOfRecipientStatusS3ByCurrentDate:
  //   getAppointmentsOfRecipientStatusS3ByCurrentDate,
  // getAppointmentsOfRecipientStatusS4: getAppointmentsOfRecipientStatusS4,
  // getAppointmentsOfRecipientStatusS5: getAppointmentsOfRecipientStatusS5,
  getAllCollectsByAddress: getAllCollectsByAddress,
  // getAllCollectsByDate: getAllCollectsByDate,
  getAllCollectsByAppointmentDate: getAllCollectsByAppointmentDate,
  getAllAppointmentsStatusByCurrentDate: getAllAppointmentsStatusByCurrentDate,
  collectFormStatisticByCurrentDate: collectFormStatisticByCurrentDate,
  collectFormStatistic: collectFormStatistic,
  getThongketheotuan: getThongketheotuan,
  getAllAppointmentsExpire: getAllAppointmentsExpire,
};
