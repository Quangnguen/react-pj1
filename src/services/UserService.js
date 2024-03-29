import axios from './axios';

const fetchAllUsers = (page) => {
    return axios.get(`/api/users?page=${page}`)
} 

const postCreateUser = (name, job) => {
    return axios.post("/api/users", {name, job})
}

const putUpdateUser = (name, job, id) => {
    return axios.put("/api/users/"+id , {name, job})
}

const deleteUser = (id) => {
    return axios.delete("/api/users/"+id)
}

const loginAPI = (email, password) => {
    return axios.post("/api/login", {email, password})
}


export {fetchAllUsers, postCreateUser, putUpdateUser, deleteUser, loginAPI}