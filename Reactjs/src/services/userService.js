import { preProcessFile } from 'typescript';
import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword});
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
        
}

const deleteUserSerVice = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
        id: userId}
    });
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getUserRoleIDService = (role) => {
    return axios.get(`/api/get-user-role?role=${role}`)
  
}


export { handleLoginApi ,
         getAllUsers , 
         createNewUserService , 
         editUserService , 
         deleteUserSerVice , 
         getAllCodeService,
         getUserRoleIDService
}