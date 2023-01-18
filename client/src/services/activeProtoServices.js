import axios from 'axios'
const baseUrl = '/api/activeProtos'

const getActiveProtos = async (user) => {
  const results = await axios.get(`${baseUrl}/${user}`)
  return results.data
}

const createActiveList = async (protos, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const results = await axios.post(`${baseUrl}`, protos, config)
  return results.data
}

export default { getActiveProtos, createActiveList }