import axios from 'axios'
const baseUrl = '/api/users'

const userSignUp = async (user) => {
  const result = await axios.post(`${baseUrl}`, user)
  return result
}

export default { userSignUp }