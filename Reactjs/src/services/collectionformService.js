import { preProcessFile } from "typescript";
import axios from "../axios";

const countCollect = (id) => {
  return axios.get(`/api/count-collect?id=${id}`);
};

const getAllSchedule = (inputId) => {
  return axios.get(`/api/get-all-schedule?id=${inputId}`);
};

const getAllCollectionForm = (inputId) => {
  return axios.get(`/api/get-all-appointment?id=${inputId}`);
};

const getAllScheduleStatus = (inputId) => {
  return axios.get(`/api/get-schedule-status?id=${inputId}`);
};

const getAllScheduleBetweenTwoStatus = (data) => {
  return axios.post("/api/get-schedule-between-two-status", data);
};

const getScheduleOfGiver = (data) => {
  return axios.post("/api/get-schedule-of-giver", data);
};

const getAllCollectionFormBySchedule = (schedule) => {
  return axios.post(
    "/api/get-all-appointment-by-schedule-by-status-by-recipientDate",
    schedule
  );
};

const registerCollectionForm = (data) => {
  return axios.post("/api/register-collect-form", data);
};

// Lấy đơn thu gom theo ngày
const getCollectionFormByCurrentDate = (date) => {
  return axios.post("/api/get-all-collects-by-date", date);
};

const getCollectionFormByAppointmentDate = (date) => {
  return axios.post("/api/get-all-collects-by-appointmentDate", date);
};

const getCollectionFormStatusByCurrentDate = (collectionForm) => {
  return axios.post(
    "/api/get-all-collects-status-by-currentDate",
    collectionForm
  );
};

const collectFormStatisticByCurrentDate = (date) => {
  return axios.post("/api/collect-form-statistic-by-currentDate", date);
};

const collectFormStatistic = () => {
  return axios.post("/api/collect-form-statistic");
};

const collectFormStatisticByStatusOfCurrentDate = (status) => {
  return axios.post(
    "/api/collect-form-statistic-by-status-of-currentDate",
    status
  );
};

const getCollectionStatisticWeek = (inputId) => {
  return axios.get(`/api/get-thongke-theo-tuan?week=${inputId}`);
};

// Lấy all đơn quá hạn
const getCollectionExpire = () => {
  return axios.get("/api/collect-form-status-s3-expire");
};

export {
  countCollect,
  getAllSchedule,
  getAllCollectionForm,
  getAllScheduleStatus,
  getAllScheduleBetweenTwoStatus,
  getAllCollectionFormBySchedule,
  registerCollectionForm,
  getScheduleOfGiver,
  getCollectionFormByCurrentDate,
  getCollectionFormByAppointmentDate,
  getCollectionFormStatusByCurrentDate,
  collectFormStatisticByCurrentDate,
  collectFormStatistic,
  collectFormStatisticByStatusOfCurrentDate,
  getCollectionStatisticWeek,
  getCollectionExpire,
};
