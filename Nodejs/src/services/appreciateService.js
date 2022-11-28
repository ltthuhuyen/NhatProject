import db from "../models/index";
import Sequelize from "sequelize";

let countAppreciateBySubmission = (submissionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appreciates = "";
      if (submissionId === "ALL") {
        appreciates = await db.Appreciate.findAll({
          group: "submissionId",
          attributes: [
            "submissionId",
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
        });
      }

      if (submissionId && submissionId !== "ALL") {
        appreciates = await db.Appreciate.findAll({
          where: { submissionId: submissionId },
          group: "submissionId",
          attributes: [
            "submissionId",
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
        });
      }

      // let appreciates = await db.Submission.findAll({
      //     group: "competitionId",
      //     attributes: [
      //     "competitionId",
      //     [Sequelize.fn("count", Sequelize.col("id")), "count"],
      //     ],
      // });
      resolve(appreciates);
    } catch (error) {
      reject(error);
    }
  });
};

let checkAppreciate = (checkSubmission, checkReviewer) => {
  return new Promise(async (resolve, reject) => {
    try {
      let submissionID = await db.Appreciate.findOne({
        where: { submissionId: checkSubmission },
      });
      let reviewerID = await db.Appreciate.findOne({
        where: { reviewerId: checkReviewer },
      });
      if (submissionID && reviewerID) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewAppreciate = (data) => {
  console.log("create", data);
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkAppreciate(data.submissionId, data.reviewerId);
      if (check == true) {
        resolve({
          errCode: 1,
          errMessange: "Không được đánh giá nữa",
        });
      } else if (!data.submissionId || !data.reviewerId) {
        resolve({
          errCode: 2,
          errMessange: "Vui lòng điền đầy đủ thông tin",
        });
      } else {
        await db.Appreciate.create({
          submissionId: data.submissionId,
          reviewerId: data.reviewerId,
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

let getAllAppreciateBySubmission = (submissionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appreciates = "";
      if (submissionId) {
        appreciates = await db.Appreciate.findAll({
          where: {
            submissionId: submissionId,
          },
          include: [
            {
              model: db.Submission,
              as: "submissionData",
            },
            {
              model: db.User,
              as: "reviewerData",
            },
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(appreciates);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllAppreciateOfReviewerBySubmission = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appreciates = "";
      if (data.submissionId && data.reviewerId) {
        appreciates = await db.Appreciate.findAll({
          where: {
            submissionId: data.submissionId,
            reviewerId: data.reviewerId,
          },
          include: [
            {
              model: db.Submission,
              as: "submissionData",
            },
            {
              model: db.User,
              as: "reviewerData",
            },
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(appreciates);
    } catch (error) {
      reject(error);
    }
  });
};

let deleteAppreciate = (id) => {
  console.log("xóa", id);
  return new Promise(async (resolve, reject) => {
    let appreciate = await db.Appreciate.findOne({
      where: { ID: id },
    });
    if (!appreciate) {
      resolve({
        errCode: 1,
        errMessage: `Không tìm thấy đáng giá`,
      });
    } else {
      await db.Appreciate.destroy({
        where: { ID: id },
      });
      resolve({
        errCode: 0,
        message: "Xóa thành công",
      });
    }
  });
};

module.exports = {
  countAppreciateBySubmission: countAppreciateBySubmission,
  getAllAppreciateBySubmission: getAllAppreciateBySubmission,
  getAllAppreciateOfReviewerBySubmission:
    getAllAppreciateOfReviewerBySubmission,
  createNewAppreciate: createNewAppreciate,
  deleteAppreciate: deleteAppreciate,
};
