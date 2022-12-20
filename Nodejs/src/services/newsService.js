import db from "../models/index";

let getAllNews = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let news = "";
      if (id === "ALL") {
        news = await db.News.findAll();
      }
      if (id && id !== "ALL") {
        news = await db.News.findOne({
          where: { ID: id },
        });
      }

      if (news && news.avatar) {
        news.avatar = new Buffer(news.avatar, "base64").toString("binary");
      }
      resolve(news);
    } catch (e) {
      reject(e);
    }
  });
};

let getNewsLimit = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let news = await db.News.findAll({
        limit: 3,
      });
      if (news && news.avatar) {
        news.avatar = new Buffer(news.avatar, "base64").toString("binary");
      }
      resolve(news);
    } catch (e) {
      reject(e);
    }
  });
};

let checkNews = (check) => {
  return new Promise(async (resolve, reject) => {
    try {
      let news = await db.News.findOne({
        where: { title: check },
      });
      if (news) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNews = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkNews(data.title);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessange: "Tin tức này đã tồn tại ",
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
        await db.News.create({
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          description: data.description,
          title: data.title,
          avatar: data.avatar,
        });
        resolve({
          errCode: 0,
          errMessage: "Thêm thành công",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteNews = (id) => {
  return new Promise(async (resolve, reject) => {
    let news = await db.News.findOne({
      where: { ID: id },
    });
    if (!news) {
      resolve({
        errCode: 1,
        errMessage: `Không tìm thấy tin tức`,
      });
    } else {
      await db.News.destroy({
        where: { ID: id },
      });
      resolve({
        errCode: 0,
        message: "Xóa thành công",
      });
    }
  });
};

let editNews = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.ID) {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy tin tức",
        });
      } else if (
        !data.title &&
        !data.avatar &&
        !data.description &&
        !data.contentHTML &&
        !data.contentMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Vui lòng điền đầy đủ thông tin",
        });
      } else {
        let news = await db.News.findOne({
          where: { ID: data.ID },
          raw: false,
        });
        if (news) {
          (news.contentHTML = data.contentHTML),
            (news.contentMarkdown = data.contentMarkdown),
            (news.description = data.description),
            (news.title = data.title);
          if (news.avatar) {
            news.avatar = data.avatar;
          }
          await news.save();
          resolve({
            errCode: 0,
            message: "Sửa tin tức thành công",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Không tìm thấy tin tức",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllNews: getAllNews,
  getNewsLimit: getNewsLimit,
  createNews: createNews,
  deleteNews: deleteNews,
  editNews: editNews,
};
