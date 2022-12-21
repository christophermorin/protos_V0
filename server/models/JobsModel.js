const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema({
  title: String,
  description: String,
  attachedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refs: 'Protos'
    }
  ]
})

module.exports = mongoose.model('Jobs', jobsSchema)