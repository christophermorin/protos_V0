import axios from 'axios'
const baseUrl = '/api/protos'

const getAllProtos = async () => {
  const result = await axios.get(`${baseUrl}`)
  return result.data
}


export default { getAllProtos }