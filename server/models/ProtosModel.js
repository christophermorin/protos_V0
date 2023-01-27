const mongoose = require('mongoose')

const protosSchema = new mongoose.Schema({
  title: String,
  description: String,
  timeOfDay: String,
  isComplete: {
    type: Boolean,
    default: false
  },
  jobs: [
    {
      title: String,
      description: Object,
      timer: Number,
      cardColor: Object,
      notification: Boolean,
      isComplete: Boolean,
      isHidden: Boolean,
    }
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

protosSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Protos', protosSchema)