const mongoose = require('mongoose')

const protosSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

protosSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Protos', protosSchema)


// title: String,
//   description: String,
//     timeOfDay: String,
//       jobs: [
//         {
//           title: String,
//           description: Object,
//           timer: Number,
//           cardColor: Object,
//           notification: Boolean,
//           isComplete: Boolean,
//           isHidden: Boolean,
//         }
//       ],
//         user: {
//   type: mongoose.Schema.Types.ObjectId,
//     ref: 'Users'
// }
// }