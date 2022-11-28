import { use } from "express/lib/router";
import submissionService from "../services/submissionService";

let handleCountSubmission = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      submissions: [],
    });
  }
  let submissions = await submissionService.countSubmission(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    submissions,
  });
};

let handleCreateSubmission = async (req, res) => {
  try {
    let data = req.body;
    let message = await submissionService.createNewSubmission(data);
    return res.status(200).json(message);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetAllSubmissions = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      submissions: [],
    });
  }
  let submissions = await submissionService.getAllSubmissions(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    submissions,
  });
};

let handleGetAllSubmissionsByCompetition = async (req, res) => {
  let id = req.query.competitionId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      submissions: [],
    });
  }
  let submissions = await submissionService.getAllSubmissionsByCompetition(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    submissions,
  });
};

let handleCountAllSubmissionsByCompetition = async (req, res) => {
  let id = req.query.competitionId; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      submissions: [],
    });
  }
  let submissions = await submissionService.countSubmissionByCompetition(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    submissions,
  });
};

let handleDeleteSubmission = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Không tìm thấy bài đăng",
    });
  }
  let message = await submissionService.deleteSumission(id);
  return res.status(200).json(message);
};

module.exports = {
  handleCountSubmission: handleCountSubmission,
  handleCreateSubmission: handleCreateSubmission,
  handleGetAllSubmissions: handleGetAllSubmissions,
  handleGetAllSubmissionsByCompetition: handleGetAllSubmissionsByCompetition,
  handleCountAllSubmissionsByCompetition:
    handleCountAllSubmissionsByCompetition,
  handleDeleteSubmission: handleDeleteSubmission,
};
