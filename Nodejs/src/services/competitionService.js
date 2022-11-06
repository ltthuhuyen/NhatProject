import db from "../models/index";

let getAllCompetition = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let competitions = "";
      if (id === "ALL") {
        competitions = await db.Competition.findAll();
      } else if (id && id !== "ALL") {
        competitions = await db.Competition.findOne({
          where: { ID: id },
        });
      }
      resolve(competitions);
    } catch (e) {
      reject(e);
    }
  });
};

let checkCompetition = (check) => {
  return new Promise(async (resolve, reject) => {
    try {
      let competition = await db.Competition.findOne({
        where: { title: check },
      });
      if (competition) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createCompetition = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkCompetition(data.title);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessange: "Cuộc thi này đã tồn tại ",
        });
      } else if (
        !data.avatar ||
        !data.title ||
        !data.description ||
        !data.contentHTML ||
        !data.contentMarkdown
      ) {
        resolve({
          errCode: 2,
          errMessage: "Vui lòng điền đầy đủ thông tin",
        });
      } else {
        await db.Competition.create({
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          description: data.description,
          title: data.title,
          avatar: data.avatar,
        });
        resolve({
          errCode: 0,
          errMessage: "Thêm cuộc thi mới thành công",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editCompetition = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.ID) {
        resolve({
          errCode: 1,
          errMessage: `Không tìm thấy cuộc thi`,
        });
      } else if (
        !data.title ||
        !data.description ||
        !data.contentHTML ||
        !data.contentMarkdown
      ) {
        resolve({
          errCode: 2,
          errMessage: `Vui lòng điền đầy đủ thông tin`,
        });
      } else {
        let competition = await db.Competition.findOne({
          where: { ID: data.ID },
          raw: false,
        });
        if (competition) {
          (competition.contentHTML = data.contentHTML),
            (competition.contentMarkdown = data.contentMarkdown),
            (competition.description = data.description),
            (competition.title = data.title);
          if (competition.avatar) {
            competition.avatar = data.avatar;
          }
          await competition.save();
          resolve({
            errCode: 0,
            message: "Cập nhật thành công",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCompetition = (id) => {
  return new Promise(async (resolve, reject) => {
    let competition = await db.Competition.findOne({
      where: { ID: id },
    });
    if (!competition) {
      resolve({
        errCode: 1,
        errMessage: `Không tìm thấy cuộc thi`,
      });
    } else {
      await db.Competition.destroy({
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
  getAllCompetition: getAllCompetition,
  checkCompetition: checkCompetition,
  createCompetition: createCompetition,
  editCompetition: editCompetition,
  deleteCompetition: deleteCompetition,
};
