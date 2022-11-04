import { preProcessFile } from "typescript";
import axios from "../axios";

const searchProduct = (search) => {
  return axios.get(`/api/search-product?product_name=${search}`);
};

const searchCollectByAddressService = (search) => {
  return axios.post("/api/search-collects-by-address", search);
};

export { searchProduct, searchCollectByAddressService };
