import { use } from "express/lib/router";
import appreciateService from "../services/appreciateService";

let handleCountAppreciate = async (req, res) => {
  let id = req.query.submissionId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appreciates: [],
    });
  }
  let appreciates = await appreciateService.countAppreciateBySubmission(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appreciates,
  });
};

let handleGetAllAppreciateBySubmission = async (req, res) => {
  let id = req.query.submissionId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appreciates: [],
    });
  }
  let appreciates = await appreciateService.getAllAppreciateBySubmission(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appreciates,
  });
};

let handleGetAllAppreciateOfReviewerBySubmission = async (req, res) => {
  let id = req.body; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      appreciates: [],
    });
  }
  let appreciates =
    await appreciateService.getAllAppreciateOfReviewerBySubmission(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    appreciates,
  });
};

let handleCreateAppreciate = async (req, res) => {
  let data = req.body;
  let message = await appreciateService.createNewAppreciate(data);
  return res.status(200).json(message);
};

let handleDeleteAppreciate = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Không tìm thấy đánh giá",
    });
  }
  let message = await appreciateService.deleteAppreciate(id);
  return res.status(200).json(message);
};

module.exports = {
  handleCountAppreciate: handleCountAppreciate,
  handleGetAllAppreciateBySubmission: handleGetAllAppreciateBySubmission,
  handleGetAllAppreciateOfReviewerBySubmission:
    handleGetAllAppreciateOfReviewerBySubmission,
  handleCreateAppreciate: handleCreateAppreciate,
  handleDeleteAppreciate: handleDeleteAppreciate,
};
