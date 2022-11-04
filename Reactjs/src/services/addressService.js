import { preProcessFile } from "typescript";
import axios from "../axios";

const getAllCities = () => {
  return axios.get("https://provinces.open-api.vn/api/");
};

const getAllDistricts = () => {
  return axios.get("https://provinces.open-api.vn/api/d");
};

const getAllWards = () => {
  return axios.get("https://provinces.open-api.vn/api/w/");
};

const getAllAddress = (addressId) => {
  return axios.get(`/api/get-all-address?id=${addressId}`);
};

const getAllAddressOfUser = (userId) => {
  return axios.get(`/api/get-all-address-of-user?userId=${userId}`);
};

const createNewAddressService = (data) => {
  return axios.post("/api/create-new-address", data);
};

const editAddressInfoService = (inputData) => {
  return axios.put("/api/edit-address-info", inputData);
};

const deleteAddressSerVice = (addressId) => {
  return axios.delete("/api/delete-address", {
    data: {
      id: addressId,
    },
  });
};

export {
  getAllCities,
  getAllDistricts,
  getAllWards,
  getAllAddress,
  getAllAddressOfUser,
  createNewAddressService,
  editAddressInfoService,
  deleteAddressSerVice,
};
