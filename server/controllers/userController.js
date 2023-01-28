const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const Users = require('../models/UserModel');
const logger = require('../utils/logger');

// Creating new user
usersRouter.post('/', async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({
      error: 'all fields required',
    });
  }
  const exsistingUser = await Users.findOne({ username });
  try {
    if (exsistingUser) {
      return res.status(400).json({
        error: 'username must be unique',
      });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new Users({
      username,
      email,
      passwordHash,
    });
    const savedUser = await user.save();
    logger.info(`User ${savedUser.username} created`);
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
  return null;
});

// This was once just a simple find({}), using the users id?
usersRouter.get('/protos/:id', async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  try {
    res.status(200).json(user.protos);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
