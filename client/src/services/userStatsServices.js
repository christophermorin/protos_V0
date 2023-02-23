import axios from 'axios';

const baseUrl = '/api/userStats';

const createInitialStats = async ({ userId, username }) => {
  const result = await axios.post(`${baseUrl}/initialize-stats/${userId}`, { username });
  return result;
};

const checkUserStreak = async (userId) => {
  const result = await axios.put(`${baseUrl}/check-streak/${userId}`);
  return result;
};

const updateStatsJobsCompleted = async (userId, { jobTitle, isComplete }) => {
  const result = await axios.put(`${baseUrl}/update-jobs/${userId}`, { jobTitle, isComplete });
  return result;
};

const updateStatsProtoCompleted = async (userId, { protoTitle, isComplete }) => {
  const result = await axios.put(`${baseUrl}/update-protos/${userId}`, { protoTitle, isComplete });
  return result;
};

export default {
  createInitialStats,
  checkUserStreak,
  updateStatsJobsCompleted,
  updateStatsProtoCompleted,
};
