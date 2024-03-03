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

const create = async newObj => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

export default { getAll, create, setUserToken }