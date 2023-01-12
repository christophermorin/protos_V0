const activeProtosRouter = require('express').Router()
const ActiveProtos = require('../models/ActiveProtosModel')
const logger = require('../utils/logger')

activeProtosRouter.get('/', async (req, res) => {
  const protos = await ActiveProtos.find().sort({ _id: -1 }).limit(1)
  try {
    return res.status(200).json(protos)
  } catch (error) {
    logger.error(error)
  }
})

activeProtosRouter.post('/', async (req, res) => {
  const selectedList = new ActiveProtos(req.body)
  try {
    const newActiveList = await selectedList.save()
    logger.info(newActiveList)
    return res.status(201).json(newActiveList)
  } catch (error) {
    logger.error(error)
  }
})

module.exports = activeProtosRouter