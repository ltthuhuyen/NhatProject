import axios from "../axios";

const countSubmission = (id) => {
  return axios.get(`/api/count-submission?id=${id}`);
};

const allSubmissions = (submissionId) => {
  return axios.get(`/api/get-all-submissions?id=${submissionId}`);
};

const allSubmissionsByCompetition = (competitionId) => {
  return axios.get(
    `/api/get-all-submissions-by-competition?competitionId=${competitionId}`
  );
};

const countSubmissionsByCompetition = (competitionId) => {
  return axios.get(
    `/api/count-all-submission-by-competition?competitionId=${competitionId}`
  );
};

const createSubmission = (data) => {
  return axios.post("/api/create-new-submission", data);
};

const editSubmission = (data) => {
  return axios.put("/api/edit-submission", data);
};

const deleteSubmission = (id) => {
  return axios.delete("/api/delete-submission", {
    data: { id: id },
  });
};

export {
  countSubmission,
  allSubmissions,
  allSubmissionsByCompetition,
  countSubmissionsByCompetition,
  createSubmission,
  editSubmission,
  deleteSubmission,
};
