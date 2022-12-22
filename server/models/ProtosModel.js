const mongoose = require('mongoose')

const protosSchema = new mongoose.Schema({
  title: String,
  description: String,
  jobs: [
    {
      title: String,
      description: String,
      timer: Number,
      notification: Boolean,
      isComplete: Boolean,
    }
  ]
})

module.exports = mongoose.model('Protos', protosSchema)