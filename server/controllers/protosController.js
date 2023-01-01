const protosRouter = require('express').Router()
const Protos = require('../models/ProtosModel')
const logger = require('../utils/logger')
const mongoose = require('mongoose')

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

protosRouter.post('/completeJob/:id', async (req, res) => {
  const id = req.params.id
  const proto = await Protos.findOneAndUpdate({ "protos.jobs": id })

  try {
    const protoJob = proto.jobs.find(job => job.id === id)
    protoJob.isComplete = !protoJob.isComplete
    await proto.save()
    return res.status(200).json(protoJob)
  } catch (error) {
    logger.error(error)
  }
})

protosRouter.post('/hideJob/:id', async (req, res) => {
  const id = req.params.id
  const proto = await Protos.findOneAndUpdate({ "protos.jobs": id })

  try {
    const protoJob = proto.jobs.find(job => job.id === id)
    protoJob.isHidden = !protoJob.isHidden
    await proto.save()
    return res.status(200).json(protoJob)
  } catch (error) {
    logger.error(error)
  }
})

module.exports = protosRouter
