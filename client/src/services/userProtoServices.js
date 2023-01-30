import axios from 'axios';

const baseUrl = '/api/protos';

const getUserProtos = async (userId) => {
  const result = await axios.get(`${baseUrl}/${userId}`);
  return result.data;
};

const createNewProto = async (newProto, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const results = await axios.post(`${baseUrl}`, newProto, config);
  return results.data;
};

const deleteUserProto = async ({ user, proto }) => {
  const result = await axios.put(`${baseUrl}/${user}`, { proto });
  // console.log('In userProServe', result);
};

export default { getUserProtos, createNewProto, deleteUserProto };
