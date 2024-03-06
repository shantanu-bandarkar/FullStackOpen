import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setUserToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObj, config)
  // console.log('axios o/p', response.data);
  return response.data
}

const updateLikes = async (id, blogObj) => {
  // console.log('BBB', id);
  // console.log('CCC', blogObj);
  const response = await axios.put(`${baseUrl}/${id}`, blogObj)
  return response.data
}

const remove = async (id) => {
  // console.log('BBB', id);
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setUserToken, updateLikes, remove }