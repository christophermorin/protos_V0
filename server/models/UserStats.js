const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  userId: String,
  username: String,
  totalProtosCompleted: Number,
  totalJobsCompleted: Object,
  dayStreak: {
    date: Date,
    streak: Number,
  },
});

const UserStats = mongoose.model('UserStats', userStatsSchema);

module.exports = UserStats;
