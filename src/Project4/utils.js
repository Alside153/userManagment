import axios from "axios";

const getAll = (url) => {
    return axios.get(url)
}

const getById = async (url, id) => {
    let resp = axios.get(`${url}/${id}`)
    return resp;
}

const addUser = (url, obj) => {
    return axios.post(url,obj)
}

const updateUser = (url, id, obj) => {
    return axios.put(`${url}/${id}`,obj)
}

const removeUser = (url, id) => {
    return axios.delete(`${url}/${id}`)
}
// eslint-disable-next-line
export default { getAll, getById, addUser, updateUser, removeUser }