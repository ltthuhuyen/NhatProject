import axios from "../axios";

const countAppreciateBySubmission = (submissionId) => {
  return axios.get(`/api/count-appreciates?id=${submissionId}`);
};

const allApprecicateBySubmission = (submissionId) => {
  return axios.get(
    `/api/get-all-appreciates-by-submissions?submissionId=${submissionId}`
  );
};

const allApprecicateOfReviewerBySubmission = (data) => {
  return axios.post(
    "/api/get-all-appreciates-of-reviewer-by-submissions",
    data
  );
};

const createAppreciate = (data) => {
  return axios.post("/api/create-new-appreciate", data);
};

const deleteAppreciate = (id) => {
  return axios.delete("/api/delete-appreciate", {
    data: { id: id },
  });
};

export {
  countAppreciateBySubmission,
  allApprecicateBySubmission,
  allApprecicateOfReviewerBySubmission,
  createAppreciate,
  deleteAppreciate,
};
