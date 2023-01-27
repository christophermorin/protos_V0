import axios from 'axios'
const baseUrl = '/api/users'

const userSignUp = async (user) => {
  const result = await axios.post(`${baseUrl}`, user)
  return result
}

const getUserProtos = async (userId) => {
  const result = await axios.get(`${baseUrl}/protos/${userId}`)
  return result.data
}

export default { userSignUp, getUserProtos }