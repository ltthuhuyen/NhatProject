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

const getCollectionFormOfRecipientByStatus = (data) => {
  return axios.post("/api/get-appointment-of-recipient-status", data);
};

const getNewCollectionForm = (inputId) => {
  return axios.get(`/api/get-appointment-status-s1?id=${inputId}`);
};

const getRegisteredCollectionForm = (inputId) => {
  return axios.get(`/api/get-appointment-status-s2?id=${inputId}`);
};

const getWaittingCollectionForm = (inputId) => {
  return axios.get(`/api/get-appointment-status-s3?id=${inputId}`);
};

const getSuccessedCollectionForm = (inputId) => {
  return axios.get(`/api/get-appointment-status-s4?id=${inputId}`);
};

const getCancelledCollectionForm = (inputId) => {
  return axios.get(`/api/get-appointment-status-s5?id=${inputId}`);
};

const getCollectionFormOfGiver = (inputId) => {
  return axios.get(`/api/get-appointment-of-giver?giverId=${inputId}`);
};

const getCollectionFormOfUnRegisteredGiver = (inputId) => {
  return axios.get(
    `/api/get-appointment-of-giver-status-s1?giverId=${inputId}`
  );
};

const getCollectionFormOfRegisteredGiver = (inputId) => {
  return axios.get(
    `/api/get-appointment-of-giver-status-s2?giverId=${inputId}`
  );
};

const getCollectionFormOfWaittingGiver = (inputId) => {
  return axios.get(
    `/api/get-appointment-of-giver-status-s3?giverId=${inputId}`
  );
};

const getCollectionFormOfSuccessedGiver = (inputId) => {
  return axios.get(
    `/api/get-appointment-of-giver-status-s4?giverId=${inputId}`
  );
};

const getCollectionFormOfCancelledGiver = (inputId) => {
  return axios.get(
    `/api/get-appointment-of-giver-status-s5?giverId=${inputId}`
  );
};

const getCollectionFormOfRecipient = (inputId) => {
  return axios.get(`/api/get-appointment-of-recipient?recipientId=${inputId}`);
};

const getCollectionFormOfRegisteredRecipient = (inputId) => {
  return axios.get(
    `/api/get-appointment-of-recipient-status-s2?recipientId=${inputId}`
  );
};

const getCollectionFormOfWaittingRecipient = (inputId) => {
  return axios.get(
    `/api/get-appointment-of-recipient-status-s3?recipientId=${inputId}`
  );
};

const getCollectionFormOfWaittingRecipientByCurrentDate = (collectionForm) => {
  return axios.post(
    "/api/all-appointment-of-recipient-status-s3-by-curentDate",
    collectionForm
  );
};

const getCollectionFormOfSuccessedRecipient = (inputId) => {
  return axios.get(
    `/api/get-appointment-of-recipient-status-s4?recipientId=${inputId}`
  );
};

const getCollectionFormOfCancelledRecipient = (inputId) => {
  return axios.get(
    `/api/get-appointment-of-recipient-status-s5?recipientId=${inputId}`
  );
};

// Lấy đơn thu gom theo ngày
const getCollectionFormByCurrentDate = (date) => {
  return axios.post("/api/get-all-collects-by-date", date);
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
const getCollectionExpire = (inputId) => {
  return axios.get(`/api/collect-form-status-s3-expire?id=${inputId}`);
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
  getCollectionFormOfRecipientByStatus,
  getNewCollectionForm,
  getRegisteredCollectionForm,
  getWaittingCollectionForm,
  getSuccessedCollectionForm,
  getCancelledCollectionForm,
  getCollectionFormOfGiver,
  getCollectionFormOfUnRegisteredGiver,
  getCollectionFormOfRegisteredGiver,
  getCollectionFormOfWaittingGiver,
  getCollectionFormOfSuccessedGiver,
  getCollectionFormOfCancelledGiver,
  getCollectionFormOfRecipient,
  getCollectionFormOfRegisteredRecipient,
  getCollectionFormOfWaittingRecipient,
  getCollectionFormOfWaittingRecipientByCurrentDate,
  getCollectionFormOfSuccessedRecipient,
  getCollectionFormOfCancelledRecipient,
  getCollectionFormByCurrentDate,
  getCollectionFormStatusByCurrentDate,
  collectFormStatisticByCurrentDate,
  collectFormStatistic,
  collectFormStatisticByStatusOfCurrentDate,
  getCollectionStatisticWeek,
  getCollectionExpire,
};
