import axios from '../axios';
const allNews = (inputId) => {
    return axios.get(`/api/get-all-news?id=${inputId}`);
}

const saveNews = (data) => {
    return axios.post('/api/create-new-news', data);
}

const deleteNews = (id) => {
    return axios.delete('/api/delete-news', {
       data: {ID: id},
    }) 
}

const editNews = (InputData) => {
    return axios.put('/api/edit-news', InputData) 
}

export {
    allNews,
    saveNews,
    deleteNews,
    editNews,
}