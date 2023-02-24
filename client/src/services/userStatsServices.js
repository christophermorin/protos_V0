import axios from 'axios';

const baseUrl = '/api/userStats';

const getUserStats = async (userId) => {
  const result = await axios.get(`${baseUrl}/${userId}`);
  return result.data;
};

const createInitialStats = async ({ userId, username }) => {
  const result = await axios.post(`${baseUrl}/initialize-stats/${userId}`, { username });
  return result;
};

const checkUserStreak = async (userId) => {
  const result = await axios.put(`${baseUrl}/check-streak/${userId}`);
  return result;
};

const updateStatsJobsCompleted = async (userId, { title, isComplete }) => {
  const result = await axios.put(`${baseUrl}/update-jobs/${userId}`, { title, isComplete });
  return result;
};

const updateStatsProtoCompleted = async (userId, { title, isComplete }) => {
  const result = await axios.put(`${baseUrl}/update-protos/${userId}`, { title, isComplete });
  return result;
};

export default {
  getUserStats,
  createInitialStats,
  checkUserStreak,
  updateStatsJobsCompleted,
  updateStatsProtoCompleted,
};
