const jobsRouter = require('express').Router()
const Jobs = require('../models/JobsModel')
const logger = require('../utils/logger')

jobsRouter.get('/', async (req, res) => {
  const allJobs = await Jobs.find()
  try {
    res.json(allJobs)
  } catch (error) {

  }
})

jobsRouter.post('/', async (req, res) => {
  const jobs = req.body
  try {
    jobs.forEach(async (job) => {
      const addedJob = new Jobs(job)
      await addedJob.save()
    })
    return res.status(201)
  } catch (error) {
    logger.error(error)
  }
})

module.exports = jobsRouter