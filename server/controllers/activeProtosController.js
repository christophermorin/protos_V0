const activeProtosRouter = require('express').Router()
const ActiveProtos = require('../models/ActiveProtosModel')
const Users = require('../models/UserModel')
const logger = require('../utils/logger')

activeProtosRouter.get('/:id', async (req, res) => {
  const protos = await ActiveProtos.find({ user: req.params.id }).sort({ _id: -1 }).limit(1)
  try {
    return res.status(200).json(protos)
  } catch (error) {
    logger.error(error)
  }
})

activeProtosRouter.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const user = await Users.findById(req.body.user)
    if (user) {
      const list = new ActiveProtos({
        activeProtos: req.body.list,
        user: user._id
      })
      const newActiveList = await list.save()
      logger.info(newActiveList)
      return res.status(201).json(newActiveList)
    }
  } catch (error) {
    logger.error(error)
  }
})

module.exports = activeProtosRouter


// const selectedList = new ActiveProtos(req.body)
// try {
//   const newActiveList = await selectedList.save()
//   logger.info(newActiveList)
//   return res.status(201).json(newActiveList)
// } catch (error) {
//   logger.error(error)
// }
// })