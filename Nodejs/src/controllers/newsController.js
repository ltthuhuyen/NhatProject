import db from "../models/index";
import newsService from "../services/newsService";

let handleGetAllNews = async (req, res) => {
  try {
    let id = req.query.id;
    let news = await newsService.getAllNews(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      news,
    });
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetNewsLimit = async (req, res) => {
  let news = await newsService.getNewsLimit();  
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    news,
  });
};

let handleCreateNews = async (req, res) => {
  let message = await newsService.createNews(req.body);
  return res.status(200).json(message);
};

let handleEditNews = async (req, res) => {
  let data = req.body;
  let message = await newsService.editNews(data);
  return res.status(200).json(message);
};

let handleDeleteNews = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await newsService.deleteNews(id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllNews: handleGetAllNews,
  handleGetNewsLimit: handleGetNewsLimit,
  handleCreateNews: handleCreateNews,
  handleDeleteNews: handleDeleteNews,
  handleEditNews: handleEditNews,
};
