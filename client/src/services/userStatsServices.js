import axios from 'axios';

const baseUrl = '/api/userStats';

const createInitialStats = async ({ userId, username }) => {
  const result = await axios.post(`${baseUrl}/initialize-stats/${userId}`, { username });
  return result;
};

const checkUserStreak = async (userId) => {
  const result = await axios.put(`${baseUrl}/check-streak/${userId}`);
  return result;
}
export default { createInitialStats, checkUserStreak };