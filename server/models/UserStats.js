const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  userId: String,
  username: String,
  totalProtosCompleted: [
    {
      protoTitle: String,
      timesCompleted: Number,
    },
  ],
  totalJobsCompleted: [
    {
      jobTitle: String,
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
