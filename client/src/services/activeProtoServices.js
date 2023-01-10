import axios from 'axios'
const baseUrl = '/api/activeProtos'

const getActiveProtos = async () => {
  const results = await axios.get(`${baseUrl}`)
  return results.data
}

const createActiveList = async (protos) => {
  const results = await axios.post(`${baseUrl}`, protos)
  return results.data
}

export default { getActiveProtos, createActiveList }