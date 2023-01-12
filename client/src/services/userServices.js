import axios from 'axios'
const baseUrl = '/api/'

const getUser = async () => {
  const result = await axios({
    method: 'GET',
    withCredentials: true,
    url: `${baseUrl}`

  })
  return result
}

const userLogIn = async (user) => {
  const results = await axios({
    method: 'POST',
    data: user,
    withCredentials: true,
    url: `${baseUrl}/login`
  })
  return results.data
}

const createUser = async (newUser) => {
  const results = await axios({
    method: 'POST',
    data: newUser,
    withCredentials: true,
    url: `${baseUrl}/signup`
  })
  return results.data
}

export default { createUser, userLogIn, getUser } 