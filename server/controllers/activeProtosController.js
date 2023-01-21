const activeProtosRouter = require('express').Router()
const ActiveProtos = require('../models/ActiveProtosModel')
const Users = require('../models/UserModel')
const logger = require('../utils/logger')

activeProtosRouter.get('/:id', async (req, res) => {
  const userId = req.params.id
  // const protos = await ActiveProtos.find({ user: userId }).sort({ _id: -1 }).limit(1)
  const user = await Users.findById(userId)
  try {
    const activeList = user.activeList
    return res.status(200).json(activeList)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

activeProtosRouter.post('/', async (req, res) => {
  const userId = req.body.user
  const newList = req.body.list
  try {
    const user = await Users.findById(userId)
    if (user) {
      user.activeList = newList
      await user.save()
      const list = new ActiveProtos({
        activeProtos: newList,
        user: user._id
      })
      const newActiveList = await list.save()
      return res.status(201).json(newActiveList)
    }
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

activeProtosRouter.put('/:id', async (req, res) => {
  const activeProtoId = req.params.id
  const newProto = req.body
  try {
    const activeList = await ActiveProtos.findOneAndUpdate({ _id: activeProtoId }, { $push: { activeProtos: newProto } })
    return res.status(201).json(activeList)
  } catch (error) {
    console.log(error)
  }
})

activeProtosRouter.post('/delete/:id', async (req, res) => {
  // const activeProtoId = req.params.id
  const userId = req.params.id
  const protoId = req.body.protoId
  try {
    // const activeList = await ActiveProtos.findOne({ _id: activeProtoId })
    const user = await Users.findById(userId)
    user.activeList = user.activeList.filter(proto => proto.id !== protoId)
    if (user.activeList.length === 0) {
      await ActiveProtos.findOneAndDelete({ user: user.id }).sort({ _id: -1 })
      await user.save()
      return res.status(201).json(null)
    }
    else {
      await user.save()
      return res.status(201).json(user.activeList)
    }
  } catch (error) {
    console.log(error)
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