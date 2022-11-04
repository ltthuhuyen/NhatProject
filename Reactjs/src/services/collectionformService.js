import { preProcessFile } from "typescript";
import axios from "../axios";

const countCollect = (id) => {
  return axios.get(`/api/count-collect?id=${id}`);
};

const getAllCollectionForm = (inputId) => {
  return axios.get(`/api/get-all-apointmenpts?id=${inputId}`);
};

const getNewCollectionForm = (inputId) => {
  return axios.get(`/api/get-apointmenpts-status-s1?id=${inputId}`);
};

const getRegisteredCollectionForm = (inputId) => {
  return axios.get(`/api/get-apointmenpts-status-s2?id=${inputId}`);
};

const getWaittingCollectionForm = (inputId) => {
  return axios.get(`/api/get-apointmenpts-status-s3?id=${inputId}`);
};

const getSuccessedCollectionForm = (inputId) => {
  return axios.get(`/api/get-apointmenpts-status-s4?id=${inputId}`);
};

const getCancelledCollectionForm = (inputId) => {
  return axios.get(`/api/get-apointmenpts-status-s5?id=${inputId}`);
};

const getCollectionFormOfGiver = (inputId) => {
  return axios.get(`/api/get-apointmenpt-of-giver?giverId=${inputId}`);
};

const getCollectionFormOfUnRegisteredGiver = (inputId) => {
  return axios.get(
    `/api/get-apointmenpt-of-giver-status-s1?giverId=${inputId}`
  );
};

const getCollectionFormOfRegisteredGiver = (inputId) => {
  return axios.get(
    `/api/get-apointmenpt-of-giver-status-s2?giverId=${inputId}`
  );
};

const getCollectionFormOfWaittingGiver = (inputId) => {
  return axios.get(
    `/api/get-apointmenpt-of-giver-status-s3?giverId=${inputId}`
  );
};

const getCollectionFormOfSuccessedGiver = (inputId) => {
  return axios.get(
    `/api/get-apointmenpt-of-giver-status-s4?giverId=${inputId}`
  );
};

const getCollectionFormOfCancelledGiver = (inputId) => {
  return axios.get(
    `/api/get-apointmenpt-of-giver-status-s5?giverId=${inputId}`
  );
};

const getCollectionFormOfRecipient = (inputId) => {
  return axios.get(`/api/get-apointmenpt-of-recipient?recipientId=${inputId}`);
};

const getCollectionFormOfRegisteredRecipient = (inputId) => {
  return axios.get(
    `/api/get-apointmenpt-of-recipient-status-s2?recipientId=${inputId}`
  );
};

const getCollectionFormOfWaittingRecipient = (inputId) => {
  return axios.get(
    `/api/get-apointmenpt-of-recipient-status-s3?recipientId=${inputId}`
  );
};

const getCollectionFormOfWaittingRecipientByCurrentDate = (collectionForm) => {
  return axios.post(
    "/api/all-apointmenpt-of-recipient-status-s3-by-curentDate",
    collectionForm
  );
};

const getCollectionFormOfSuccessedRecipient = (inputId) => {
  return axios.get(
    `/api/get-apointmenpt-of-recipient-status-s4?recipientId=${inputId}`
  );
};

const getCollectionFormOfCancelledRecipient = (inputId) => {
  return axios.get(
    `/api/get-apointmenpt-of-recipient-status-s5?recipientId=${inputId}`
  );
};

export {
  countCollect,
  getAllCollectionForm,
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
};
