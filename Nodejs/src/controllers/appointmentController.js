import { use } from "express/lib/router";
import appointmentService from "../services/appointmentService";

let handleGetAllSchedules = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }
  let appointments = await appointmentService.getAllSchedules(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleGetAllAppointments = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }
  let appointments = await appointmentService.getAllAppointments(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleGetScheduleByStatus = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getScheduleByStatus(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleGetScheduleBetweenTwoStatus = async (req, res) => {
  let data = req.body; //all, data
  if (!data) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getScheduleBetweenTwoStatus(data);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleScheduleOfGiver = async (req, res) => {
  let data = req.body; //all, data
  if (!data) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getScheduleOfGiver(data);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleGetAllAppointmentsByScheduleByStatusByRecipientDate = async (
  req,
  res
) => {
  let data = req.body; //all, data
  if (!data) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }
  let appointments =
    await appointmentService.getAllAppointmentsByScheduleByStatusByReceivedDate(
      data
    );
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleRegisterCollect = async (req, res) => {
  let message = await appointmentService.registerCollectionForm(req.body);
  return res.status(200).json(message);
};

let handleAppointmentsOfRecipientStatus = async (req, res) => {
  let data = req.body; //all, data
  if (!data) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentsOfRecipientStatus(
    data
  );
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

// let handleAppointmentsStatusS2 = async (req, res) => {
//   let id = req.query.id; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments = await appointmentService.getAppointmentStatusS2(id);
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsStatusS3 = async (req, res) => {
//   let id = req.query.id; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments = await appointmentService.getAppointmentStatusS3(id);
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsStatusS4 = async (req, res) => {
//   let id = req.query.id; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments = await appointmentService.getAppointmentStatusS4(id);
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsStatusS5 = async (req, res) => {
//   let id = req.query.id; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments = await appointmentService.getAppointmentStatusS5(id);
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsOfGiver = async (req, res) => {
//   let id = req.query.giverId; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments = await appointmentService.getAppointmentsOfGiver(id);
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsOfGiverStatusS1 = async (req, res) => {
//   let id = req.query.giverId; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments = await appointmentService.getAppointmentsOfGiverStatusS1(
//     id
//   );
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsOfGiverStatusS2 = async (req, res) => {
//   let id = req.query.giverId; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments = await appointmentService.getAppointmentsOfGiverStatusS2(
//     id
//   );
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsOfGiverStatusS3 = async (req, res) => {
//   let id = req.query.giverId; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments = await appointmentService.getAppointmentsOfGiverStatusS3(
//     id
//   );
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsOfGiverStatusS4 = async (req, res) => {
//   let id = req.query.giverId; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments = await appointmentService.getAppointmentsOfGiverStatusS4(
//     id
//   );

//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsOfGiverStatusS5 = async (req, res) => {
//   let id = req.query.giverId; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments = await appointmentService.getAppointmentsOfGiverStatusS5(
//     id
//   );

//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsOfRecipient = async (req, res) => {
//   let id = req.query.recipientId; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments = await appointmentService.getAppointmentsOfRecipient(id);
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsOfRecipientStatusS2 = async (req, res) => {
//   let id = req.query.recipientId; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments =
//     await appointmentService.getAppointmentsOfRecipientStatusS2(id);

//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsOfRecipientStatusS3 = async (req, res) => {
//   let id = req.query.recipientId; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments =
//     await appointmentService.getAppointmentsOfRecipientStatusS3(id);

//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsOfRecipientStatusS3ByDate = async (req, res) => {
//   let data = req.body; //all, id
//   if (!data) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments =
//     await appointmentService.getAppointmentsOfRecipientStatusS3ByCurrentDate(
//       data
//     );

//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

// let handleAppointmentsOfRecipientStatusS4 = async (req, res) => {
//   let id = req.query.recipientId; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }

//   let appointments =
//     await appointmentService.getAppointmentsOfRecipientStatusS4(id);

//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

let handleGetAllCollectsByAddress = async (req, res) => {
  let id = req.query.addressId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      collects: [],
    });
  }

  let collects = await appointmentService.getAllCollectsByAddress(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    collects,
  });
};

let handleGetAllCollectsByDate = async (req, res) => {
  let data = req.body; //all, id

  if (!data) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      collects: [],
    });
  }

  let collects = await appointmentService.getAllCollectsByDate(data);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    collects,
  });
};

// // Đơn thu gom được tạo bởi ngày hiện tại theo từng trạng thái
let handleGetAllCollectsStatusByCurrentDate = async (req, res) => {
  let collectionForm = req.body; //all, id

  if (!collectionForm) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      collects: [],
    });
  }

  let collects = await appointmentService.getAllAppointmentsStatusByCurrentDate(
    collectionForm
  );
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    collects,
  });
};

// // Thống kê từ ngày ... đến ngày hiện tại
let handleCollectFormStatisticByCurrentDate = async (req, res) => {
  let data = req.body; //all, id
  if (!data) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      collects: [],
    });
  }
  let collects = await appointmentService.collectFormStatisticByCurrentDate(
    data
  );
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    collects,
  });
};

let handleCollectFormStatistic = async (req, res) => {
  let collects = await appointmentService.collectFormStatistic();
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    collects,
  });
};

let handleCollectFormStatisticByStatusOfCurrentDate = async (req, res) => {
  let data = req.body; //all, id
  if (!data) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      collects: [],
    });
  }
  let collects =
    await appointmentService.collectFormStatisticByStatusOfCurrentDate(data);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    collects,
  });
};

let handleThongketheotuan = async (req, res) => {
  let week = req.query.week;
  if (!week) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      week: [],
    });
  }
  let res1 = await appointmentService.getThongketheotuan(week);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    res1,
  });
};

// let handleAppointmentsStatusS3Expire = async (req, res) => {
//   let id = req.query.id; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Missing required parmeters",
//       appointments: [],
//     });
//   }
//   let appointments = await appointmentService.getAllAppointmentsExpire(id);
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     appointments,
//   });
// };

module.exports = {
  handleGetAllSchedules: handleGetAllSchedules,
  handleGetAllAppointments: handleGetAllAppointments,
  handleGetScheduleByStatus: handleGetScheduleByStatus,
  handleGetScheduleBetweenTwoStatus: handleGetScheduleBetweenTwoStatus,
  handleScheduleOfGiver: handleScheduleOfGiver,
  handleGetAllAppointmentsByScheduleByStatusByRecipientDate:
    handleGetAllAppointmentsByScheduleByStatusByRecipientDate,
  handleRegisterCollect: handleRegisterCollect,
  handleScheduleOfGiver: handleScheduleOfGiver,
  handleAppointmentsOfRecipientStatus: handleAppointmentsOfRecipientStatus,
  // handleAppointmentsNew: handleAppointmentsNew,
  // handleAppointmentsStatusS2: handleAppointmentsStatusS2,
  // handleAppointmentsStatusS3: handleAppointmentsStatusS3,
  // handleAppointmentsStatusS4: handleAppointmentsStatusS4,
  // handleAppointmentsStatusS5: handleAppointmentsStatusS5,
  // handleAppointmentsOfGiver: handleAppointmentsOfGiver,
  // handleAppointmentsOfGiverStatusS1: handleAppointmentsOfGiverStatusS1,
  // handleAppointmentsOfGiverStatusS2: handleAppointmentsOfGiverStatusS2,
  // handleAppointmentsOfGiverStatusS3: handleAppointmentsOfGiverStatusS3,
  // handleAppointmentsOfGiverStatusS4: handleAppointmentsOfGiverStatusS4,
  // handleAppointmentsOfGiverStatusS5: handleAppointmentsOfGiverStatusS5,
  // handleAppointmentsOfRecipient: handleAppointmentsOfRecipient,
  // handleAppointmentsOfRecipientStatusS2: handleAppointmentsOfRecipientStatusS2,
  // handleAppointmentsOfRecipientStatusS3: handleAppointmentsOfRecipientStatusS3,
  // handleAppointmentsOfRecipientStatusS3ByDate:
  //   handleAppointmentsOfRecipientStatusS3ByDate,
  // handleAppointmentsOfRecipientStatusS4: handleAppointmentsOfRecipientStatusS4,
  // handleAppointmentsOfRecipientStatusS5: handleAppointmentsOfRecipientStatusS5,
  handleGetAllCollectsByAddress: handleGetAllCollectsByAddress,
  handleGetAllCollectsByDate: handleGetAllCollectsByDate,
  handleGetAllCollectsStatusByCurrentDate:
    handleGetAllCollectsStatusByCurrentDate,
  handleCollectFormStatisticByCurrentDate:
    handleCollectFormStatisticByCurrentDate,
  handleCollectFormStatistic: handleCollectFormStatistic,
  handleCollectFormStatisticByStatusOfCurrentDate:
    handleCollectFormStatisticByStatusOfCurrentDate,
  handleThongketheotuan: handleThongketheotuan,
  // handleAppointmentsStatusS3Expire: handleAppointmentsStatusS3Expire,
};
