import axios from 'axios'
const baseUrl = '/api/protos'

const getAllUserProtos = async () => {
  const results = await axios.get(`${baseUrl}`)
  return results.data
}

export default { getAllUserProtos }