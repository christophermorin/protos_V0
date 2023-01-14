const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Protos = require('../models/ProtosModel')

const api = supertest(app)

// ******************************************************************************
// ********************************* User Tests**********************************
// ******************************************************************************
describe('Creating new users', () => {
  beforeEach(helper.createRootUser)
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'roger',
      email: 'mail@mail.mail',
      password: 'rabbit',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      email: 'mail@mail.com',
      password: 'rabbit',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('creation fails if any field is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'duck',
      email: 'mail@mail.mail',
      password: ''
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('all fields required')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

// ******************************************************************************
// ********************************* Login Tests*********************************
// ******************************************************************************
describe('Logging users in', () => {
  beforeEach(helper.createRootUser)
  test('Successfull login, returns token and username', async () => {
    const user = {
      username: 'root',
      password: 'squirrel'
    }
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.token).toBeDefined()
    expect(result.body.username).toEqual('root')
  })
  test('Invalid password or username fails with proper status code and message', async () => {
    const user = {
      username: 'notRoot',
      password: 'duck'
    }
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid username or password')
    expect(result.body.token).toBeUndefined()
  })
})

// ******************************************************************************
// ********************************* Proto Tests*********************************
// ******************************************************************************
describe('Creating new Protos', () => {
  beforeEach(async () => {
    await Protos.deleteMany({})
    helper.createRootUser
  })
  test('logged in user can create a new proto', async () => {
    const protosAtStart = await helper.protosInDb()
    const user = await api
      .post('/api/login')
      .send({ username: 'root', password: 'squirrel' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(user.body.token).toBeDefined()
    expect(user.body.username).toEqual('root')

    const result = await api
      .post('/api/protos')
      .set({ Authorization: `bearer ${user.body.token}` })
      .send(helper.initialProtos[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.user).toEqual(user.body.id)
    expect(result.body.title).toContain('One test')
    expect(result.body.description).toContain('Testing protos')

    const protosAtEnd = await helper.protosInDb()
    expect(protosAtEnd).toHaveLength(protosAtStart.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})