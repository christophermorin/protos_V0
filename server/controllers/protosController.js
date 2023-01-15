const jwt = require('jsonwebtoken')
const protosRouter = require('express').Router()
const Protos = require('../models/ProtosModel')
const Users = require('../models/UserModel')
const logger = require('../utils/logger')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

protosRouter.get('/:id', async (req, res, next) => {
  const protos = await Protos.find({ user: req.params.id }).populate('user', { username: 1 })
  try {
    return res.status(200).json(protos)
  } catch (error) {
    next(error)
  }
})

protosRouter.post('/', async (req, res, next) => {
  const token = await getTokenFrom(req)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await Users.findById(decodedToken.id)
    const proto = new Protos({
      ...req.body,
      user: user._id
    })

    const newProto = await proto.save()
    user.protos = user.protos.concat(newProto._id)
    await user.save()
    logger.info(newProto)
    return res.status(201).json(newProto)
  } catch (error) {
    next(error)
  }
})

module.exports = protosRouter
