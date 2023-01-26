import axios from 'axios'
const baseUrl = '/api/activeProtos'

// Active Proto List
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
// WORKING **************************************************************************************
const addManyToActive = async (listId, protos) => {
  const result = await axios.put(`${baseUrl}/add-many/${listId}`, protos)
  return result.data
}

const deleteOneFromActive = async (listId, { protoId, userId }) => {
  const result = await axios.post(`${baseUrl}/delete/${listId}`, { protoId: protoId, userId: userId })
  return result.data
}

const deleteActiveList = async (listId, userId) => {
  const result = await axios.delete(`${baseUrl}/delete-many/${listId}`, { userId })
  return result.data
}

const completeProto = async (listId, { protoId, isComplete }) => {
  const result = await axios.put(`${baseUrl}/complete/${listId}`, { protoId, isComplete })
  return result.data
}



// ActiveProto Jobs
const toggleJobComplete = async (listId, { protoId, jobId, isComplete }) => {
  const completedStatus = await axios.put(`${baseUrl}/job/complete/${listId}`, { protoId, jobId, isComplete })
  return completedStatus.data
}

const deleteJob = async (listId, { protoId, jobId }) => {
  const deleteStatus = await axios.put(`${baseUrl}/job/delete/${listId}`, { protoId, jobId })
  return deleteStatus.data
}

export default { getActiveProtos, createActiveList, addOneToActive, deleteOneFromActive, toggleJobComplete, deleteJob, completeProto, addManyToActive, deleteActiveList }