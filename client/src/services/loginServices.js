import axios from "axios";
const baseUrl = 'api/login'

const loginUser = async (user) => {
  const result = await axios.post(`${baseUrl}`, user)
  return result
}

export default { loginUser }