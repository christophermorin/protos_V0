const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const helper = require('./test_helper');
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
  beforeEach(helper.createRootUsers);
  test('Logged in user can create a new proto', async () => {
    const user = await helper.logInUser('root', 'squirrel')
    const userProtosAtStart = await helper.userProtosInDb(user.body.id)
    const protoCreated = await helper.createOneProto(
      user.body.token,
      helper.initialProtos[0],
    );

    const userProtosAtEnd = await helper.userProtosInDb(user.body.id)
    expect(protoCreated.body.title).toContain('one test')
    expect(userProtosAtEnd).toHaveLength(userProtosAtStart.length + 1)
  });
  test('New proto creation fails with proper status code and message if title already exists', async () => {
    const user = await helper.logInUser('root', 'squirrel');
    await helper.createOneProto(
      user.body.token,
      helper.initialProtos[0],
    );
    const userProtosAtStart = await helper.userProtosInDb(user.body.id)
    const result = await api
      .post('/api/protos')
      .set({ Authorization: `bearer ${user.body.token}` })
      .send(helper.initialProtos[0])
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const userProtosAtEnd = await helper.userProtosInDb(user.body.id)
    expect(result.body.error).toContain('proto by that title already exists');
    expect(userProtosAtEnd).toHaveLength(userProtosAtStart.length);
  });
  test('Delete one proto from user library', async () => {
    const user = await helper.logInUser('root', 'squirrel');
    for (const proto of helper.initialProtos) {
      await helper.createOneProto(
        user.body.token,
        proto,
      );
    }
    const userProtosAtStart = await helper.userProtosInDb(user.body.id)
    const userProtosAtEnd = await api
      .put(`/api/protos/${user.body.id}`)
      .send({ proto: userProtosAtStart[1].title })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(userProtosAtEnd.body).toHaveLength(userProtosAtStart.length - 1)
    expect(userProtosAtEnd.body[0].title).toContain('one test')
  })
});

// ******************************************************************************
// ****************************** Active Proto Tests*****************************
// ******************************************************************************
describe('Creating and altering the active proto list', () => {
  beforeEach(async () => {
    await helper.createRootUsers()
    await ActiveProtos.deleteMany({});
    const user = await helper.logInUser('root', 'squirrel');
    for (const proto of helper.initialProtos) {
      await helper.createOneProto(
        user.body.token,
        proto,
      );
    }
  })
  test('Creating an active list', async () => {
    const user = await helper.logInUser('root', 'squirrel');
    const userProtosAtStart = await helper.userProtosInDb(user.body.id)
    const createdActiveList = await api
      .post('/api/activeProtos')
      .send({
        user: user.body.id,
        selectedProtos: userProtosAtStart,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(createdActiveList.body.activeProtos).toHaveLength(userProtosAtStart.length);
  });
  test('Adding to an active list', async () => {
    const user = await helper.logInUser('root', 'squirrel');
    const createdActiveList = await api
      .post('/api/activeProtos')
      .send({
        user: user.body.id,
        selectedProtos: helper.initialProtos[0],
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(createdActiveList.body.activeProtos).toHaveLength(1)

    const createdActiveListId = createdActiveList.body._id
    const addOneToActiveList = await api
      .put(`/api/activeProtos/add-one/${createdActiveListId}`)
      .send(helper.initialProtos[1])
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(addOneToActiveList.body.activeProtos).toHaveLength(2)

    const userId = createdActiveList.body.user
    const getActiveListAtEnd = await api
      .get(`/api/activeProtos/${userId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(getActiveListAtEnd.body.activeProtos).toHaveLength(2)
  });
  test('Add many to an active list', async () => {
    const user = await helper.logInUser('root', 'squirrel');
    const createdActiveList = await api
      .post('/api/activeProtos')
      .send({
        user: user.body.id,
        selectedProtos: helper.extraInitialProto,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(createdActiveList.body.activeProtos).toHaveLength(1)

    const createdActiveListId = createdActiveList.body._id
    const addManyToActiveList = await api
      .put(`/api/activeProtos/add-many/${createdActiveListId}`)
      .send(helper.initialProtos)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(addManyToActiveList.body.activeProtos).toHaveLength(3)
  });
  test('Deleting one from active list', async () => {
    const user = await helper.logInUser('root', 'squirrel');
    const userProtosAtStart = await helper.userProtosInDb(user.body.id)
    const createdActiveList = await api
      .post('/api/activeProtos')
      .send({
        user: user.body.id,
        selectedProtos: userProtosAtStart,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(createdActiveList.body.activeProtos).toHaveLength(userProtosAtStart.length);

    const createdActiveListId = createdActiveList.body._id
    const userId = createdActiveList.body.user
    const protoId = createdActiveList.body.activeProtos[0]._id
    const activeListAfterDelete = await api
      .post(`/api/activeProtos/delete-one/${createdActiveListId}`)
      .send({ protoId, userId })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(activeListAfterDelete.body.activeProtos).toHaveLength(userProtosAtStart.length - 1)
    expect(activeListAfterDelete.body.activeProtos[0].title).toContain('two test')
  });
  test('Delete/Clear active proto list', async () => {
    const user = await helper.logInUser('root', 'squirrel');
    const userProtosAtStart = await helper.userProtosInDb(user.body.id)
    const createdActiveList = await api
      .post('/api/activeProtos')
      .send({
        user: user.body.id,
        selectedProtos: userProtosAtStart,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(createdActiveList.body.activeProtos).toHaveLength(2)

    const createdActiveListId = createdActiveList.body._id
    const deletedActiveList = await api
      .delete(`/api/activeProtos/delete-many/${createdActiveListId}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(deletedActiveList.body).toEqual(null)

    const getUserActiveList = await api
      .get(`/api/activeProtos/${user.body.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(getUserActiveList.body).toEqual(null)
  })
});

// ******************************************************************************
// ****************************** Active Proto Jobs Tests************************
// ******************************************************************************
describe('Complete and delete active proto jobs', () => {
  beforeEach(async () => {
    await helper.createRootUsers()
    await ActiveProtos.deleteMany({});
    const user = await helper.logInUser('root', 'squirrel');
    for (const proto of helper.initialProtos) {
      await helper.createOneProto(
        user.body.token,
        proto,
      );
    }
    const userProtosAtStart = await helper.userProtosInDb(user.body.id)
    const createdActiveList = await api
      .post('/api/activeProtos')
      .send({
        user: user.body.id,
        selectedProtos: userProtosAtStart,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);
  }),
    test('Mark one job complete in active proto', async () => {
      const user = await helper.logInUser('root', 'squirrel');
      const getUserActiveList = await api
        .get(`/api/activeProtos/${user.body.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(getUserActiveList.body.activeProtos).toHaveLength(2)

      const intialJobState = helper.getJobCompleteVariables(getUserActiveList.body)
      const jobMarkedComplete = await api
        .put(`/api/activeProtos/job/complete/${intialJobState.userActiveListId}`)
        .send({
          protoId: intialJobState.targetProtoId,
          jobId: intialJobState.targetJobId,
          isComplete: !intialJobState.isJobComplete
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const endJobState = helper.getJobCompleteVariables(jobMarkedComplete.body)
      expect(endJobState.isJobComplete).toEqual(!intialJobState.isJobComplete)
    })
  test('Delete one job in active proto', async () => {
    const user = await helper.logInUser('root', 'squirrel');
    const getUserActiveList = await api
      .get(`/api/activeProtos/${user.body.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(getUserActiveList.body.activeProtos).toHaveLength(2)
    const intialJobState = helper.getJobCompleteVariables(getUserActiveList.body)

    const jobDeleted = await api
      .put(`/api/activeProtos/job/delete/${intialJobState.userActiveListId}`)
      .send({
        protoId: intialJobState.targetProtoId,
        jobId: intialJobState.targetJobId
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const endJobState = helper.getJobCompleteVariables(jobDeleted.body)
    expect(endJobState.targetJobs).toHaveLength(intialJobState.targetJobs.length - 1)
  })
})

// ******************************************************************************
// ****************************** User Stats Tests*******************************
// ******************************************************************************

describe('User stats', () => {
  beforeEach(async () => {
    await helper.clearUserStats();
    await helper.createRootUsers();
  })
  test('Initial user stats are created on signup', async () => {
    // await helper.createRootUsers()
    const users = await helper.usersInDb()
    const dateOfTest = new Date().getDay()
    const rootUserInitalStats = await api
      .post(`/api/userStats/initialize-stats/${users[0].id}`)
      .send({ username: users[0].username })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const dateOfStatsInit = new Date(rootUserInitalStats.body.dayStreak.date).getDay()

    expect(rootUserInitalStats.body.userId).toEqual(users[0].id)
    expect(rootUserInitalStats.body.username).toEqual(users[0].username)
    expect(rootUserInitalStats.body.totalProtosCompleted).toBeDefined()
    expect(rootUserInitalStats.body.totalJobsCompleted).toBeDefined()
    expect(rootUserInitalStats.body.daysWorked).toEqual(1)
    expect(dateOfStatsInit).toEqual(dateOfTest)
    expect(rootUserInitalStats.body.dayStreak.streak).toEqual(1)
  })
})

afterAll(() => {
  mongoose.connection.close();
});
