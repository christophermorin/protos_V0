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

const deleteOneFromActive = async (listId, { protoId, userId }) => {
  const result = await axios.post(`${baseUrl}/delete/${listId}`, { protoId: protoId, userId: userId })
  return result.data
}
// ActiveProto Jobs
const toggleJobComplete = async (listId, { protoId, jobId, isComplete }) => {
  const completedStatus = await axios.put(`${baseUrl}/job/complete/${listId}`, { protoId, jobId, isComplete })
  return completedStatus.data
}

const setJobHidden = async (listId, { protoId, jobId, isHidden }) => {
  const hiddenStatus = await axios.put(`${baseUrl}/job/hidden/${listId}`, { protoId, jobId, isHidden })
  return hiddenStatus.data
}

export default { getActiveProtos, createActiveList, addOneToActive, deleteOneFromActive, toggleJobComplete, setJobHidden, }