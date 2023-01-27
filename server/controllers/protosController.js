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
    // const userProtos = await Protos.find({ user: user.id })
    const protoExisting = user.protos.find(proto => proto.title === req.body.title)
    if (protoExisting) {
      return res.status(400).json({
        error: 'proto by that title already exists'
      })
    }
    const newProto = new Protos(
      {
        ...req.body,
        user: user.id
      }
    )
    console.log(newProto)
    user.protos.push(newProto)
    await user.save()
    return res.status(201).json(newProto)
  } catch (error) {
    next(error)
  }
})

module.exports = protosRouter
