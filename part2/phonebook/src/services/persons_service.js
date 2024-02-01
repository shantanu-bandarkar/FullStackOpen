import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newObj) =>
  axios.post(baseUrl, newObj).then((response) => response.data);

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => response.data);

const updateNum = (id,updateObj) =>
  axios.put(`${baseUrl}/${id}`, updateObj).then((response) => response.data);

export default { getAll, create, remove, updateNum };
