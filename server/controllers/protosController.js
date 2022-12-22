const protosRouter = require('express').Router()
const Protos = require('../models/ProtosModel')
const logger = require('../utils/logger')

protosRouter.get('/', async (req, res) => {
  const protos = await Protos.find()
  return res.status(200).json(protos)
})

protosRouter.post('/', async (req, res) => {
  const proto = new Protos(req.body)
  console.log(proto)
  if (!proto.title) {
    res.status(400).json({ error: 'Protos title required' }).end()
  }
  try {
    const newProto = await proto.save()
    return res.status(201).json(newProto)
  } catch (error) {
    logger.error(error)
  }
})

module.exports = protosRouter
