const mongoose = require('mongoose')

const protosSchema = new mongoose.Schema({
  title: String,
  description: String,
  timeOfDay: String,
  jobs: [
    {
      title: String,
      description: Object,
      timer: Number,
      cardColor: Object,
      notification: Boolean,
      isComplete: Boolean,
    }
  ]
})

module.exports = mongoose.model('Protos', protosSchema)