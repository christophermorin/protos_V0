const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  userId: String,
  totalProtos: Number,
  totalProtosCompleted: Number,
  dayStreak: Number,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
