const bcrypt = require('bcrypt');
const supertest = require('supertest');
const Users = require('../models/UserModel');
const UserStats = require('../models/UserStats')
const app = require('../index');

const api = supertest(app);

// Creating a root user
const createRootUsers = async () => {
  await Users.deleteMany({});
  for (const user of initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const result = new Users({ username: user.username, passwordHash, email: user.email });

    await result.save();
  }
};

// Log in root user
const logInUser = async (username, password) => {
  const user = await api
    .post('/api/login')
    .send({ username, password })
    .expect(200)
    .expect('Content-Type', /application\/json/);
  return user;
};

const clearUserStats = async () => {
  await UserStats.deleteMany({})
}

// Create one Protos as logged uer
const createOneProto = async (token, proto) => {
  const result = await api
    .post('/api/protos')
    .set({ Authorization: `bearer ${token}` })
    .send(proto)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  return result;
};

// Getting initial state of Users DB
const usersInDb = async () => {
  const users = await Users.find({});
  return users.map((user) => user.toJSON());
};

//Getting all protos created by logged User
const userProtosInDb = async (userId) => {
  const result = await api
    .get(`/api/protos/${userId}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  return result.body
}

//Extract variables for job complete test
const getJobCompleteVariables = (userActiveList) => {
  const userActiveListId = userActiveList._id
  const targetProto = userActiveList.activeProtos[0]
  const targetProtoId = targetProto._id
  const targetJobs = targetProto.jobs
  const targetJobId = targetProto.jobs[0]._id
  const isJobComplete = targetProto.jobs[0].isComplete

  return { userActiveListId, targetProtoId, targetJobs, targetJobId, isJobComplete }

}

// Used to create default protos
const initialProtos = [
  {
    title: 'one test',
    description: 'testing protos',
    timeOfDay: 'morning',
    jobs: [
      {
        title: 'job one',
        description: 'testing protos one',
        timer: 10,
        cardColor: {
          r: 125,
          g: 0,
          b: 10,
          a: 1,
        },
        notification: false,
        isComplete: false,
        isHidden: false,
      },
      {
        title: 'job two',
        description: 'testing protos one',
        timer: 10,
        cardColor: {
          r: 125,
          g: 0,
          b: 10,
          a: 1,
        },
        notification: false,
        isComplete: false,
        isHidden: false,
      },
    ],
  },
  {
    title: 'two test',
    description: 'testing protos',
    timeOfDay: 'afternoon',
    jobs: [
      {
        title: 'tob two',
        description: 'testing protos two',
        timer: 20,
        cardColor: {
          r: 125,
          g: 0,
          b: 10,
          a: 1,
        },
        notification: false,
        isComplete: false,
        isHidden: false,
      },
    ],
  },
];

const extraInitialProto = {
  title: 'third test',
  description: 'testing add many',
  timeOfDay: 'morning',
  jobs: [
    {
      title: 'job one',
      description: 'testing protos three',
      timer: 10,
      cardColor: {
        r: 125,
        g: 0,
        b: 10,
        a: 1,
      },
      notification: false,
      isComplete: false,
      isHidden: false,
    },
    {
      title: 'job two',
      description: 'testing protos three',
      timer: 10,
      cardColor: {
        r: 125,
        g: 0,
        b: 10,
        a: 1,
      },
      notification: false,
      isComplete: false,
      isHidden: false,
    },
  ],
}

const initialUsers = [
  {
    username: 'root',
    email: 'tree@tree.mail',
    password: 'squirrel',
  },
  {
    username: 'duck',
    email: 'duck@duck.mail',
    password: 'goose',
  },
];

module.exports = {
  initialProtos,
  extraInitialProto,
  usersInDb,
  clearUserStats,
  createRootUsers,
  logInUser,
  createOneProto,
  userProtosInDb,
  getJobCompleteVariables,
};
