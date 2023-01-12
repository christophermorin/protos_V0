const usersRouter = require('express').Router()
const Users = require('../models/UsersModel')
const logger = require('../utils/logger')
const bcrypt = require('bcryptjs')
const passport = require('passport')

usersRouter.get('/', (req, res) => {
  return res.send(req.user)
})

usersRouter.post('/login', async (req, res, next) => {
  console.log(req.body)
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).json(user)
        console.log(req.user);
      });
    }
  })(req, res, next);
})

usersRouter.post('/signup', (req, res) => {
  Users.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send('User already exsists');
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      });
      await newUser.save()
      return res.status(201).json(newUser)
    }
  })
})

module.exports = usersRouter