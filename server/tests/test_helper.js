const Users = require('../models/UserModel')
const Protos = require('../models/ProtosModel')
const bcrypt = require('bcrypt')

// Creating a defaul user
const createRootUser = async () => {
  await Users.deleteMany({})
  const passwordHash = await bcrypt.hash('squirrel', 10)
  const user = new Users({ username: 'root', passwordHash, email: 'mail@mail.mail' })

  await user.save()
}

// Getting initial state of Users DB
const usersInDb = async () => {
  const users = await Users.find({})
  return users.map(user => user.toJSON())
}

// Getting initial state of Protos DB
const protosInDb = async () => {
  const protos = await Protos.find({})
  return protos.map(proto => proto.toJSON())
}


// Used to create default protos
const initialProtos = [
  {
    title: "One test",
    description: "Testing protos",
  },
  {
    title: "Two test",
    description: "Testing protos",
  },
]

module.exports = { initialProtos, usersInDb, createRootUser, protosInDb }