const protosRouter = require('express').Router()
const Protos = require('../models/ProtosModel')
const logger = require('../utils/logger')

protosRouter.get('/', async (req, res) => {
  const protos = await Protos.find()
  try {
    return res.status(200).json(protos)
  } catch (error) {
    logger.error(error)
  }
})

protosRouter.post('/', async (req, res) => {
  const proto = new Protos(req.body)
  if (!proto.title) {
    logger.error('Protos title required')
    res.status(400).json({ error: 'Protos title required' }).end()
  }
  try {
    const newProto = await proto.save()
    logger.info(newProto)
    return res.status(201).json(newProto)
  } catch (error) {
    logger.error(error)
  }
})

module.exports = protosRouter
