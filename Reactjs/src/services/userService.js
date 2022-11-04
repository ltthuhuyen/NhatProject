import { CssSyntaxError } from "postcss";
import { BiCommentDetail } from "react-icons/bi";
import { preProcessFile } from "typescript";
import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const handleSendEmailForgotPassword = (email) => {
  return axios.post("/api/send-email-forgot-password", email);
};

const handleChangePassword = (
  email,
  password,
  new_password,
  confirm_password
) => {
  return axios.post(
    "/api/change-password",
    email,
    password,
    new_password,
    confirm_password
  );
};

const countUser = (id) => {
  return axios.get(`/api/count-user?id=${id}`);
};

const searchUser = (search) => {
  return axios.get(`/api/search-user?email=${search}`);
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const editUserInfoService = (inputData) => {
  return axios.put("/api/edit-user-info", inputData);
};

const deleteUserSerVice = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getUserRoleIDService = (role) => {
  return axios.get(`/api/get-user-role?role=${role}`);
};

export {
  handleLoginApi,
  handleSendEmailForgotPassword,
  handleChangePassword,
  countUser,
  searchUser,
  getAllUsers,
  createNewUserService,
  editUserService,
  editUserInfoService,
  deleteUserSerVice,
  getAllCodeService,
  getUserRoleIDService,
};
