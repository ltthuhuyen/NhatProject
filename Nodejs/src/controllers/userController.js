import { use } from "express/lib/router";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Vui lòng nhập đầy đủ thông tin!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleUserSendEmailForgotPassword = async (req, res) => {
  let email = req.body.email;
  let message = await userService.handleSendEmailForgotPassword(email);
  return res.status(200).json(message);
};

let handleUserChangePassword = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let new_password = req.body.new_password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let message = await userService.handleChangePassword(
    email,
    password,
    new_password
  );
  return res.status(200).json(message);
};

let handleCountUser = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      users: [],
    });
  }
  let users = await userService.countUser(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};

let handleSearchUser = async (req, res) => {
  let data = req.query.email;
  let message = await userService.searchUser(data);
  return res.status(200).json(message);
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      users: [],
    });
  }

  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};

// User Role Test
let handleGetUsersRole = async (req, res) => {
  let role = req.query.role; //all, id
  if (!role) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      users: [],
    });
  }

  let users = await userService.getRoleID(role);
  // console.log(users)
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  return res.status(200).json(message);
};

let handleEditUserInfo = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserInfo(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Không tìm thấy người dùng",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeSerVice(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Lỗi server",
    });
  }
};

let handleUserStatistic = async (req, res) => {
  let users = await userService.userStatistic();
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};

module.exports = {
  handleLogin: handleLogin,
  handleUserSendEmailForgotPassword: handleUserSendEmailForgotPassword,
  handleUserChangePassword: handleUserChangePassword,
  handleSearchUser: handleSearchUser,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleEditUserInfo: handleEditUserInfo,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
  handleGetUsersRole: handleGetUsersRole,
  handleCountUser: handleCountUser,
  handleUserStatistic: handleUserStatistic,
};
