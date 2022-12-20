import express from "express";
import homeController from "../controllers/homeController";
import allCodeController from "../controllers/allCodeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import scheduleController from "../controllers/schechuleController";
import appointmentController from "../controllers/appointmentController";
import tempController from "../controllers/tempController";
import newsController from "../controllers/newsController";
import competitionController from "../controllers/competitionController";
import submissionController from "../controllers/submissionController";
import addressController from "../controllers/addressController";
import searchController from "../controllers/searchController";
import appreciateController from "../controllers/appreciateController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.get("/api/allcode", userController.getAllCode);
  router.get("/api/get-time", allCodeController.getTime);

  router.post("/api/login", userController.handleLogin);
  router.post(
    "/api/send-email-forgot-password",
    userController.handleUserSendEmailForgotPassword
  );
  router.post("/api/change-password", userController.handleUserChangePassword);
  router.get("/api/count-user", userController.handleCountUser);
  router.get("/api/search-user", userController.handleSearchUser);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.put("/api/edit-user-info", userController.handleEditUserInfo);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/get-user-role", userController.handleGetUsersRole);
  router.post("/api/user-statistic", userController.handleUserStatistic);
  // Product
  router.get("/api/search-product", searchController.handleSearchProduct);
  router.post(
    "/api/create-new-product",
    productController.handleCreateNewProduct
  );
  router.get("/api/get-all-products", productController.handleGetAllProducts);
  router.put("/api/edit-product", productController.handleEditProduct);
  router.delete("/api/delete-product", productController.handleDeleteProduct);

  router.post("/api/create-new-temp", tempController.handleCreateTemp);
  router.get("/api/get-all-temps", tempController.handleGetAllTemps);
  router.delete(
    "/api/delete-product-in-temp",
    tempController.handleDeleteProductInTemp
  );
  router.delete(
    "/api/delete-all-temp-of-giver",
    tempController.handleDeleteAllTempOfGiver
  );
  // Schedule
  router.get("/api/count-collect", scheduleController.handleCountCollect);
  router.post(
    "/api/create-new-schedule",
    scheduleController.handleCreateSchedule
  );
  router.get(
    "/api/get-all-schedule",
    appointmentController.handleGetAllSchedules
  );
  router.get(
    "/api/get-all-appointment",
    appointmentController.handleGetAllAppointments
  );
  router.get(
    "/api/get-schedule-status",
    appointmentController.handleGetScheduleByStatus
  );
  router.post(
    "/api/get-schedule-between-two-status",
    appointmentController.handleGetScheduleBetweenTwoStatus
  );

  router.post(
    "/api/get-schedule-of-giver",
    appointmentController.handleScheduleOfGiver
  );
  router.post(
    "/api/get-all-appointment-by-schedule-by-status-by-recipientDate",
    appointmentController.handleGetAllAppointmentsByScheduleByStatusByRecipientDate
  );
  router.post(
    "/api/register-collect-form",
    appointmentController.handleRegisterCollect
  );
  // router.post(
  //   "/api/get-appointment-of-recipient-status",
  //   appointmentController.handleAppointmentsOfRecipientStatus
  // );
  router.put(
    "/api/update-registration-status",
    scheduleController.handleUpdateRegistrationStatus
  );
  router.put("/api/update-status", scheduleController.handleUpdateStatus);
  router.put(
    "/api/update-receivedDate",
    scheduleController.handleUpdateReceivedDate
  );
  router.put(
    "/api/update-status-expire",
    scheduleController.handleUpdateStatusExpire
  );

  // router.get(
  //   "/api/get-appointment-status-s2",
  //   appointmentController.handleAppointmentsStatusS2
  // );
  // router.get(
  //   "/api/get-appointment-status-s3",
  //   appointmentController.handleAppointmentsStatusS3
  // );
  // router.get(
  //   "/api/get-appointment-status-s4",
  //   appointmentController.handleAppointmentsStatusS4
  // );
  // router.get(
  //   "/api/get-appointment-status-s5",
  //   appointmentController.handleAppointmentsStatusS5
  // );
  // router.get(
  //   "/api/get-appointment-of-giver",
  //   appointmentController.handleAppointmentsOfGiver
  // );
  // router.get(
  //   "/api/get-appointment-of-giver-status-s1",
  //   appointmentController.handleAppointmentsOfGiverStatusS1
  // );
  // router.get(
  //   "/api/get-appointment-of-giver-status-s2",
  //   appointmentController.handleAppointmentsOfGiverStatusS2
  // );
  // router.get(
  //   "/api/get-appointment-of-giver-status-s3",
  //   appointmentController.handleAppointmentsOfGiverStatusS3
  // );
  // router.get(
  //   "/api/get-appointment-of-giver-status-s4",
  //   appointmentController.handleAppointmentsOfGiverStatusS4
  // );
  // router.get(
  //   "/api/get-appointment-of-giver-status-s5",
  //   appointmentController.handleAppointmentsOfGiverStatusS5
  // );
  // router.get(
  //   "/api/get-appointment-of-recipient",
  //   appointmentController.handleAppointmentsOfRecipient
  // );
  // router.get(
  //   "/api/get-appointment-of-recipient-status-s2",
  //   appointmentController.handleAppointmentsOfRecipientStatusS2
  // );
  // router.get(
  //   "/api/get-appointment-of-recipient-status-s3",
  //   appointmentController.handleAppointmentsOfRecipientStatusS3
  // );
  // router.post(
  //   "/api/all-appointment-of-recipient-status-s3-by-curentDate",
  //   appointmentController.handleAppointmentsOfRecipientStatusS3ByDate
  // );

  // router.get(
  //   "/api/get-appointment-of-recipient-status-s4",
  //   appointmentController.handleAppointmentsOfRecipientStatusS4
  // );

  // router.get(
  //   "/api/get-all-collects-by-address",
  //   appointmentController.handleGetAllCollectsByAddress
  // );

  router.post(
    "/api/get-all-collects-by-date",
    appointmentController.handleGetAllCollectsByDate
  );

  router.post(
    "/api/get-all-collects-by-appointmentDate",
    appointmentController.handleGetAllCollectsByAppointmentDate
  );

  router.post(
    "/api/get-all-collects-status-by-currentDate",
    appointmentController.handleGetAllCollectsStatusByCurrentDate
  );

  router.post(
    "/api/collect-form-statistic-by-currentDate",
    appointmentController.handleCollectFormStatisticByCurrentDate
  );
  router.post(
    "/api/collect-form-statistic",
    appointmentController.handleCollectFormStatistic
  );
  router.post(
    "/api/collect-form-statistic-by-status-of-currentDate",
    appointmentController.handleCollectFormStatisticByStatusOfCurrentDate
  );

  router.get(
    "/api/collect-form-status-s3-expire",
    appointmentController.handleAppointmentsStatusS3Expire
  );

  router.get(
    "/api/get-thongke-theo-tuan",
    appointmentController.handleThongketheotuan
  );

  router.post(
    "/api/search-collects-by-address",
    searchController.handleSearchCollectionByAddress
  );

  // .

  // Tin tức
  router.get("/api/search-news", searchController.handleSearchNews);
  router.post("/api/create-new-news", newsController.handleCreateNews);
  router.get("/api/get-all-news", newsController.handleGetAllNews);
  router.get("/api/get-news-limit", newsController.handleGetNewsLimit);
  router.put("/api/edit-news", newsController.handleEditNews);
  router.delete("/api/delete-news", newsController.handleDeleteNews);

  // Cuộc thi
  router.get(
    "/api/search-competitive",
    searchController.handleSearchCompetitive
  );
  router.post(
    "/api/create-new-competition",
    competitionController.handleCreateCompetition
  );
  router.get(
    "/api/get-all-competitions",
    competitionController.handleGetAllCompetition
  );
  router.put(
    "/api/edit-competition",
    competitionController.handleEditCompetition
  );
  router.delete(
    "/api/delete-competition",
    competitionController.handleDeleteCompetition
  );

  router.get(
    "/api/count-submission",
    submissionController.handleCountSubmission
  );
  router.post(
    "/api/create-new-submission",
    submissionController.handleCreateSubmission
  );
  router.get(
    "/api/get-all-submissions",
    submissionController.handleGetAllSubmissions
  );
  router.get(
    "/api/get-all-submissions-by-competition",
    submissionController.handleGetAllSubmissionsByCompetition
  );
  router.get(
    "/api/count-all-submission-by-competition",
    submissionController.handleCountAllSubmissionsByCompetition
  );
  router.delete(
    "/api/delete-submission",
    submissionController.handleDeleteSubmission
  );

  // Đánh giá
  router.get(
    "/api/count-appreciates",
    appreciateController.handleCountAppreciate
  );
  router.get(
    "/api/get-all-appreciates-by-submissions",
    appreciateController.handleGetAllAppreciateBySubmission
  );
  router.post(
    "/api/get-all-appreciates-of-reviewer-by-submissions",
    appreciateController.handleGetAllAppreciateOfReviewerBySubmission
  );
  router.post(
    "/api/create-new-appreciate",
    appreciateController.handleCreateAppreciate
  );
  router.delete(
    "/api/delete-appreciate",
    appreciateController.handleDeleteAppreciate
  );

  router.get("https://provinces.open-api.vn/api/");
  router.get("https://provinces.open-api.vn/api/d/");
  router.get("https://provinces.open-api.vn/api/w/");
  router.post(
    "/api/create-new-address",
    addressController.handleCreateNewAddress
  );
  router.get("/api/get-all-address", addressController.handleGetAllAddresses);
  router.get(
    "/api/get-all-address-of-user",
    addressController.handleGetAllAddressesOfUser
  );
  router.put("/api/edit-address-info", addressController.handleEditAddressInfo);
  router.delete("/api/delete-address", addressController.handleDeleteAddress);

  return app.use("/", router);
};

module.exports = initWebRoutes;
