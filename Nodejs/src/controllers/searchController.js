import { use } from "express/lib/router";
import searchService from "../services/searchService";

let handleSearchProduct = async (req, res) => {
  let data = req.query.product_name;
  let message = await searchService.searchProduct(data);
  return res.status(200).json(message);
};

let handleSearchNews = async (req, res) => {
  let data = req.query.title;
  let message = await searchService.searchNews(data);
  return res.status(200).json(message);
};

let handleSearchCompetitive = async (req, res) => {
  let data = req.query.title;
  let message = await searchService.searchCompetitive(data);
  return res.status(200).json(message);
};

let handleSearchCollectionByAddress = async (req, res) => {
  let data = req.body;
  let message = await searchService.searchCollectionByAddress(data);
  return res.status(200).json(message);
};

module.exports = {
  handleSearchProduct: handleSearchProduct,
  handleSearchNews: handleSearchNews,
  handleSearchCompetitive: handleSearchCompetitive,
  handleSearchCollectionByAddress: handleSearchCollectionByAddress,
};
