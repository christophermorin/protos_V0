const Users = require('../models/UserModel')
const Protos = require('../models/ProtosModel')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


// Creating a root user
const createRootUsers = async () => {
  await Users.deleteMany({})
  for (let user of initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const result = new Users({ username: user.username, passwordHash, email: user.email })

    await result.save()
  }
}

// Log in root user
const logInUser = async (username, password) => {
  const user = await api
    .post('/api/login')
    .send({ username: username, password: password })
    .expect(200)
    .expect('Content-Type', /application\/json/)
  return user
}

// Create one Protos as logged uer
const createOneProto = async (token, proto) => {
  const result = await api
    .post('/api/protos')
    .set({ Authorization: `bearer ${token}` })
    .send(proto)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  return result
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

const initialUsers = [
  {
    username: 'root',
    email: 'tree@tree.mail',
    password: 'squirrel'
  },
  {
    username: 'duck',
    email: 'duck@duck.mail',
    password: 'goose'
  }
]

module.exports = {
  initialProtos,
  usersInDb,
  createRootUsers,
  protosInDb,
  logInUser,
  createOneProto
}