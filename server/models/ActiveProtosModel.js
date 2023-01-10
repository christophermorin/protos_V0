const mongoose = require('mongoose')

const activeProtosSchema = new mongoose.Schema({
  activeProtos: [

  ]
})

module.exports = mongoose.model('ActiveProtos', activeProtosSchema)