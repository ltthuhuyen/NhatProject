import db from "../models/index";
import Sequelize from "sequelize";

let check_Competition_Participant = (checkCompetition, checkParticipant) => {
  return new Promise(async (resolve, reject) => {
    try {
      let competitionID = await db.Submission.findOne({
        where: { competitionId: checkCompetition },
      });
      let participantID = await db.Submission.findOne({
        where: { participantId: checkParticipant },
      });
      if (competitionID && participantID) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

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

let createNewSubmission = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await check_Competition_Participant(
        data.competitionId,
        data.participantId
      );
      if (check == true) {
        resolve({
          errCode: 1,
          errMessange: "Không được tham gia nữa",
        });
      } else if (
        !data.competitionId ||
        !data.participantId ||
        !data.avatar ||
        !data.title ||
        !data.description ||
        !data.contentHTML ||
        !data.contentMarkdown
      ) {
        resolve({
          errCode: 2,
          errMessange: "Thiếu thông tin",
        });
      } else {
        await db.Submission.create({
          competitionId: data.competitionId,
          participantId: data.participantId,
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          description: data.description,
          title: data.title,
          avatar: data.avatar,
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
      } else {
        submissions = await db.Submission.findOne({
          where: {
            ID: submissionId,
          },
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
      if (submissions && submissions.avatar) {
        submissions.avatar = new Buffer(submissions.avatar, "base64").toString(
          "binary"
        );
      }
      resolve(submissions);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllSubmissionsByCompetition = (competitionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let submissions = "";
      if (competitionId) {
        submissions = await db.Submission.findAll({
          where: {
            competitionId: competitionId,
          },

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
      if (submissions && submissions.avatar) {
        submissions.avatar = new Buffer(submissions.avatar, "base64").toString(
          "binary"
        );
      }
      resolve(submissions);
    } catch (error) {
      reject(error);
    }
  });
};

let countSubmissionByCompetition = (competitionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let submissions = "";
      if (competitionId === "ALL") {
        submissions = await db.Submission.findAll({
          group: "competitionId",
          attributes: [
            "competitionId",
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
        });
      }

      if (competitionId && competitionId !== "ALL") {
        submissions = await db.Submission.findAll({
          where: { competitionId: competitionId },
          group: "competitionId",
          attributes: [
            "competitionId",
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
        });
      }

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

let deleteSumission = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundSubmission = await db.Submission.findOne({
      where: { ID: id },
    });
    let appreciate = await db.Appreciate.findAll({
      where: {
        submissionId: id,
      },
    });
    if (!foundSubmission) {
      resolve({
        errCode: 1,
        errMessage: `Không tìm thấy bài thi`,
      });
    } else {
      await db.Submission.destroy({
        where: { ID: id },
      });
      await db.Appreciate.destroy({
        where: { submissionId: id },
      });
      resolve({
        errCode: 0,
        message: "Xóa thành công",
      });
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });
    let foundAddress = await db.Address.findAll({
      where: { userId: userId },
    });
    if (!foundUser) {
      resolve({
        errCode: 1,
        errMessage: "Không Tìm thấy người dùng",
      });
    } else {
      let user = await db.User.destroy({
        where: { id: userId },
      });
      let address = await db.Address.destroy({
        where: { userId: userId },
      });
      resolve({
        errCode: 0,
        errMessage: "Xóa người dùng thành công",
      });
    }
  });
};

module.exports = {
  check_Competition_Participant: check_Competition_Participant,
  countSubmission: countSubmission,
  createNewSubmission: createNewSubmission,
  getAllSubmissions: getAllSubmissions,
  getAllSubmissionsByCompetition: getAllSubmissionsByCompetition,
  countSubmissionByCompetition: countSubmissionByCompetition,
  deleteSumission: deleteSumission,
};
