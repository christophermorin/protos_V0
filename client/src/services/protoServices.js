import axios from 'axios'
const baseUrl = '/api/protos'

// let token = null

// const setToken = newToken => {
// token = `bearer ${newToken}`
// }

const getAllUserProtos = async (userId) => {
  const results = await axios.get(`${baseUrl}/${userId}`)
  return results.data
}

const createNewProto = async (newProto, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const results = await axios.post(`${baseUrl}`, newProto, config)
  console.log(results)
  return results.data
}

export default { getAllUserProtos, createNewProto, }