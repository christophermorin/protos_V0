const mongoose = require('mongoose')

const activeProtosSchema = new mongoose.Schema({
  activeProtos: [

  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('ActiveProtos', activeProtosSchema)