import axios from '../axios';

const allCompetitions = (inputId) => {
    return axios.get(`/api/get-all-competitions?id=${inputId}`);
}

const createCompetition = (data) => {
    return axios.post('/api/create-new-competition', data);
}

const editCompetition = (InputData) => {
    return axios.put('/api/edit-competition', InputData) 
}

const deleteCompetition = (id) => {
    return axios.delete('/api/delete-competition', {
       data: {id: id},
    }) 
}

export {
    allCompetitions,
    createCompetition,
    editCompetition,
    deleteCompetition,
}