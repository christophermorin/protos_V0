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

const addOneToActive = async (listId, proto) => {
  await axios.put(`${baseUrl}/${listId}`, proto)
}

const deleteOneFromActive = async (listId, protoId) => {
  const result = await axios.post(`${baseUrl}/delete/${listId}`, { protoId: protoId })
  return result.data
}

export default { getActiveProtos, createActiveList, addOneToActive, deleteOneFromActive }