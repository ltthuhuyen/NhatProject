import { use } from "express/lib/router";
import scheduleService from "../services/scheduleService";

let handleCountCollect = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      collects: [],
    });
  }
  let collects = await scheduleService.countCollect(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    collects,
  });
};

let handleCreateSchedule = async (req, res) => {
  let message = await scheduleService.createNewSchedule(req.body);
  return res.status(200).json(message);
};

let handleUpdateStatusS2 = async (req, res) => {
  let data = req.body;
  let message = await scheduleService.updateStatusS2(data);
  return res.status(200).json(message);
};

let handleUpdateStatusS3 = async (req, res) => {
  let data = req.body;
  let message = await scheduleService.updateStatusS3(data);
  return res.status(200).json(message);
};

let handleUpdateStatus = async (req, res) => {
  let data = req.body;
  let message = await scheduleService.updateStatus(data);
  return res.status(200).json(message);
};

let handleUpdateRegistrationStatus = async (req, res) => {
  let data = req.body;
  let message = await scheduleService.updateRegistrationStatus(data);
  return res.status(200).json(message);
};

let handleUpdateReceivedDate = async (req, res) => {
  let data = req.body;
  let message = await scheduleService.updateReceivedDate(data);
  return res.status(200).json(message);
};

module.exports = {
  handleCountCollect: handleCountCollect,
  handleCreateSchedule: handleCreateSchedule,
  handleUpdateStatusS2: handleUpdateStatusS2,
  handleUpdateStatusS3: handleUpdateStatusS3,
  handleUpdateStatus: handleUpdateStatus,
  handleUpdateRegistrationStatus: handleUpdateRegistrationStatus,
  handleUpdateReceivedDate: handleUpdateReceivedDate,
};
