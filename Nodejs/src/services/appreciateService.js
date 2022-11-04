import db from "../models/index";
import Sequelize from "sequelize";

let countSubmission = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let submissions = "";
      if (id === "ALL") {
        submissions = await db.Submission.findAll({
          attributes: [[Sequelize.fn("count", Sequelize.col("id")), "count"]],
        });
      }

      // if (competitionId && competitionId !== "ALL") {
      //   submissions = await db.Submission.findAll({
      //     where: { competitionId: competitionId },
      //     group: "competitionId",
      //     attributes: [
      //       "competitionId",
      //       [Sequelize.fn("count", Sequelize.col("id")), "count"],
      //     ],
      //   });
      // }

      // let submissions = await db.Submission.findAll({
      //     group: "competitionId",
      //     attributes: [
      //     "competitionId",
      //     [Sequelize.fn("count", Sequelize.col("id")), "count"],
      //     ],
      // });
      resolve(submissions);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewAppreciate = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.submissionId || !data.reviewerId) {
        resolve({
          errCode: 1,
          errMessange: "Vui lòng điền đầy đủ thông tin",
        });
      } else {
        await db.Appreciate.create({
          competitionId: data.competitionId,
          participantId: data.participantId,
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

let getAllSubmissions = (submissionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let submissions = "";
      if (submissionId === "ALL") {
        submissions = await db.Submission.findAll({
          include: [
            {
              model: db.Competition,
              as: "competitionData",
            },
            {
              model: db.User,
              as: "participantData",
            },
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(submissions);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  countSubmission: countSubmission,
  createNewAppreciate: createNewAppreciate,
};
