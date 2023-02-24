const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  userId: String,
  username: String,
  totalProtosCompleted: [
    {
      title: String,
      timesCompleted: Number,
    },
  ],
  totalJobsCompleted: [
    {
      title: String,
      timesCompleted: Number,
    },
  ],
  daysWorked: Number,
  dayStreak: {
    date: Date,
    streak: Number,
  },
});

const UserStats = mongoose.model('UserStats', userStatsSchema);

module.exports = UserStats;
