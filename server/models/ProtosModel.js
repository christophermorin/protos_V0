const mongoose = require('mongoose')

const protosSchema = new mongoose.Schema({
  title: String,
  description: String,
  jobs: [
    {
      title: String,
    }
  ]
})

module.exports = mongoose.model('Protos', protosSchema)