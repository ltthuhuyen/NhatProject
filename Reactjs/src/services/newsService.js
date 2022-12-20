import axios from "../axios";

const allNews = (inputId) => {
  return axios.get(`/api/get-all-news?id=${inputId}`);
};

const allNewsLimit = () => {
  return axios.get("/api/get-news-limit");
};

const createNews = (data) => {
  return axios.post("/api/create-new-news", data);
};

const deleteNews = (id) => {
  return axios.delete("/api/delete-news", {
    data: { id: id },
  });
};

const editNews = (InputData) => {
  return axios.put("/api/edit-news", InputData);
};

export { allNews, allNewsLimit, createNews, deleteNews, editNews };
