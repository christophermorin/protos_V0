const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Protos = require('../models/ProtosModel');
const ActiveProtos = require('../models/ActiveProtosModel');

const api = supertest(app);

// ******************************************************************************
// ********************************* User Tests**********************************
// ******************************************************************************
describe('Creating new users', () => {
  beforeEach(helper.createRootUsers);
  test('Creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'roger',
      email: 'mail@mail.mail',
      password: 'rabbit',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test('Creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'root',
      email: 'mail@mail.com',
      password: 'rabbit',
    };
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
  test('Creation fails if any field is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'duck',
      email: 'mail@mail.mail',
      password: '',
    };
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('all fields required');
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

// ******************************************************************************
// ********************************* Login Tests*********************************
// ******************************************************************************
describe('Logging users in', () => {
  beforeEach(helper.createRootUsers);
  test('Successfull login, returns token and username', async () => {
    const user = {
      username: 'root',
      password: 'squirrel',
    };
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(result.body.token).toBeDefined();
    expect(result.body.username).toEqual('root');
  });
  test('Invalid password or username fails with proper status code and message', async () => {
    const user = {
      username: 'notRoot',
      password: 'nope',
    };
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('invalid username or password');
    expect(result.body.token).toBeUndefined();
  });
});

// ******************************************************************************
// ********************************* Proto Tests*********************************
// ******************************************************************************
describe('Creating and getting user protos', () => {
  beforeEach(async () => {
    await Protos.deleteMany({});
    helper.createRootUsers;
  });
  test('Logged in user can create a new proto', async () => {
    const protosAtStart = await helper.protosInDb();
    const user = await api
      .post('/api/login')
      .send({ username: 'root', password: 'squirrel' })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(user.body.token).toBeDefined();
    expect(user.body.username).toEqual('root');

    const result = await api
      .post('/api/protos')
      .set({ Authorization: `bearer ${user.body.token}` })
      .send(helper.initialProtos[0])
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(result.body.user).toEqual(user.body.id);
    expect(result.body.title).toContain('one test');
    expect(result.body.description).toContain('testing protos');
    expect(result.body.jobs).toHaveLength(2);

    const protosAtEnd = await helper.protosInDb();
    expect(protosAtEnd).toHaveLength(protosAtStart.length + 1);
  });
  test('Retrieve protos created by logged in user', async () => {
    // Log as first user and create one proto
    const firstUser = await helper.logInUser('root', 'squirrel');
    await helper.createOneProto(
      firstUser.body.token,
      helper.initialProtos[0],
    );
    // Log as second user and create one proto
    const secondUser = await helper.logInUser('duck', 'goose');
    await helper.createOneProto(
      secondUser.body.token,
      helper.initialProtos[1],
    );
    // Get all protos creatd by first user
    const result = await api
      .get(`/api/protos/${firstUser.body.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(result.body[0].user.id).toEqual(firstUser.body.id);
    expect(result.body[0].title).toContain('one test');
  });
  test('New proto creation fails with proper status code and message if title already exists', async () => {
    const firstUser = await helper.logInUser('root', 'squirrel');
    await helper.createOneProto(
      firstUser.body.token,
      helper.initialProtos[0],
    );
    const protosAtStart = await helper.protosInDb();
    const result = await api
      .post('/api/protos')
      .set({ Authorization: `bearer ${firstUser.body.token}` })
      .send(helper.initialProtos[0])
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const protosAtEnd = await helper.protosInDb();
    expect(result.body.error).toContain('proto by that title already exists');
    expect(protosAtEnd).toHaveLength(protosAtStart.length);
  });

  // ******************************************************************************
  // ****************************** Active Proto Tests*****************************
  // ******************************************************************************
});
describe('Creating and altering the active proto list', () => {
  beforeEach(async () => {
    await Protos.deleteMany({});
    await ActiveProtos.deleteMany({});
    helper.createRootUsers;
    const user = await helper.logInUser('root', 'squirrel');
    for (const proto of helper.initialProtos) {
      await helper.createOneProto(
        user.body.token,
        proto,
      );
    }
  });
  test('Creating an active list', async () => {
    const user = await helper.logInUser('root', 'squirrel');
    const protosAtStart = await helper.protosInDb();

    const result = await api
      .post('/api/activeProtos')
      .send({
        user: user.body.id,
        list: protosAtStart,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(result.body.activeProtos).toHaveLength(protosAtStart.length);
  });
  test('Adding to an active list', async () => {
    const user = await helper.logInUser('root', 'squirrel');

    await api
      .post('/api/activeProtos')
      .send({
        user: user.body.id,
        list: helper.initialProtos[0],
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const [activeProtoAtStart] = await helper.activeProtoInDb();
    expect(activeProtoAtStart.activeProtos).toHaveLength(1);
    expect(activeProtoAtStart.activeProtos[0].title).toContain('one test');

    const activeProtoId = activeProtoAtStart._id;
    await api
      .put(`/api/activeProtos/${activeProtoId}`)
      .send(helper.initialProtos[1])
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const [activeProtoAtEnd] = await helper.activeProtoInDb();
    expect(activeProtoAtEnd.activeProtos).toHaveLength(2);
    expect(activeProtoAtEnd.activeProtos[1].title).toContain('two test');
  });
  test('Deleting one from active list', async () => {
    const user = await helper.logInUser('root', 'squirrel');
    const protosAtStart = await helper.protosInDb();
    const createList = await api
      .post('/api/activeProtos')
      .send({
        user: user.body.id,
        list: protosAtStart,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(createList.body.activeProtos).toHaveLength(protosAtStart.length);

    const [activeListAtStart] = await helper.activeProtoInDb();
    await api
      .post(`/api/activeProtos/delete/${activeListAtStart._id}`)
      .send({ protoId: protosAtStart[0].id })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const [activeListAtEnd] = await helper.activeProtoInDb();
    expect(activeListAtEnd.activeProtos).toHaveLength(activeListAtStart.activeProtos.length - 1);
    expect(activeListAtEnd.activeProtos[0].title).toContain('two test');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
