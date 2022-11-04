import { use } from "express/lib/router";
import appointmentService from "../services/appointmentService";

let handleGetAllAppointments = async (req, res) => {
  let id = req.query.id; //all, id
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

let handleAppointmentsNew = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentsNew(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsStatusS2 = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentStatusS2(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsStatusS3 = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentStatusS3(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsStatusS4 = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentStatusS4(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsStatusS5 = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentStatusS5(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfGiver = async (req, res) => {
  let id = req.query.giverId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentsOfGiver(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfGiverStatusS1 = async (req, res) => {
  let id = req.query.giverId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentsOfGiverStatusS1(
    id
  );
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfGiverStatusS2 = async (req, res) => {
  let id = req.query.giverId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentsOfGiverStatusS2(
    id
  );
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfGiverStatusS3 = async (req, res) => {
  let id = req.query.giverId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentsOfGiverStatusS3(
    id
  );
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfGiverStatusS4 = async (req, res) => {
  let id = req.query.giverId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentsOfGiverStatusS4(
    id
  );

  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfGiverStatusS5 = async (req, res) => {
  let id = req.query.giverId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentsOfGiverStatusS5(
    id
  );

  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfRecipient = async (req, res) => {
  let id = req.query.recipientId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments = await appointmentService.getAppointmentsOfRecipient(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfRecipientStatusS2 = async (req, res) => {
  let id = req.query.recipientId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments =
    await appointmentService.getAppointmentsOfRecipientStatusS2(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfRecipientStatusS3 = async (req, res) => {
  let id = req.query.recipientId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments =
    await appointmentService.getAppointmentsOfRecipientStatusS3(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfRecipientStatusS3ByDate = async (req, res) => {
  let data = req.body; //all, id
  if (!data) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments =
    await appointmentService.getAppointmentsOfRecipientStatusS3ByCurrentDate(
      data
    );

  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfRecipientStatusS4 = async (req, res) => {
  let id = req.query.recipientId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments =
    await appointmentService.getAppointmentsOfRecipientStatusS4(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

let handleAppointmentsOfRecipientStatusS5 = async (req, res) => {
  let id = req.query.recipientId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appointments: [],
    });
  }

  let appointments =
    await appointmentService.getAppointmentsOfRecipientStatusS5(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appointments,
  });
};

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
  let date = req.query.date; //all, id

  if (!date) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      collects: [],
    });
  }

  let collects = await appointmentService.getAllCollectsByDate(date);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    collects,
  });
};

module.exports = {
  handleGetAllAppointments: handleGetAllAppointments,
  handleAppointmentsNew: handleAppointmentsNew,
  handleAppointmentsStatusS2: handleAppointmentsStatusS2,
  handleAppointmentsStatusS3: handleAppointmentsStatusS3,
  handleAppointmentsStatusS4: handleAppointmentsStatusS4,
  handleAppointmentsStatusS5: handleAppointmentsStatusS5,
  handleAppointmentsOfGiver: handleAppointmentsOfGiver,
  handleAppointmentsOfGiverStatusS1: handleAppointmentsOfGiverStatusS1,
  handleAppointmentsOfGiverStatusS2: handleAppointmentsOfGiverStatusS2,
  handleAppointmentsOfGiverStatusS3: handleAppointmentsOfGiverStatusS3,
  handleAppointmentsOfGiverStatusS4: handleAppointmentsOfGiverStatusS4,
  handleAppointmentsOfGiverStatusS5: handleAppointmentsOfGiverStatusS5,
  handleAppointmentsOfRecipient: handleAppointmentsOfRecipient,
  handleAppointmentsOfRecipientStatusS2: handleAppointmentsOfRecipientStatusS2,
  handleAppointmentsOfRecipientStatusS3: handleAppointmentsOfRecipientStatusS3,
  handleAppointmentsOfRecipientStatusS3ByDate:
    handleAppointmentsOfRecipientStatusS3ByDate,
  handleAppointmentsOfRecipientStatusS4: handleAppointmentsOfRecipientStatusS4,
  handleAppointmentsOfRecipientStatusS5: handleAppointmentsOfRecipientStatusS5,
  handleGetAllCollectsByAddress: handleGetAllCollectsByAddress,
  handleGetAllCollectsByDate: handleGetAllCollectsByDate,
};
