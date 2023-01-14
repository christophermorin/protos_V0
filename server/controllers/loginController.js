const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('../models/UserModel')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body
  const user = await Users.findOne({ username })
  try {
    const passwordConfirm = user === null
      ? false
      : bcrypt.compareSync(password, user.passwordHash)

    if (!(user && passwordConfirm)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    res
      .status(200)
      .send({ token, username: user.username, id: user._id })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
