import axios from "../axios";

const countAppreciateBySubmission = (submissionId) => {
  return axios.get(`/api/count-appreciates?id=${submissionId}`);
};

const allApprecicateBySubmission = (data) => {
  return axios.post("/api/get-all-appreciates-by-submissions", data);
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
  createAppreciate,
  deleteAppreciate,
};
