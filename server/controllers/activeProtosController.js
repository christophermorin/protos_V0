const activeProtosRouter = require('express').Router()
const ActiveProtos = require('../models/ActiveProtosModel')
const Users = require('../models/UserModel')
const logger = require('../utils/logger')

activeProtosRouter.get('/:id', async (req, res, next) => {
  const userId = req.params.id
  // const protos = await ActiveProtos.find({ user: userId }).sort({ _id: -1 }).limit(1)
  const { activeList } = await Users.findById(userId).populate('activeList')
  try {
    const returnList = activeList
    // console.log(activeList)
    return res.status(200).json(returnList)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

activeProtosRouter.post('/', async (req, res, next) => {
  const userId = req.body.user
  const newList = req.body.list
  try {
    const user = await Users.findById(userId)
    if (user) {
      const list = new ActiveProtos({
        activeProtos: newList,
        user: user._id
      })
      const newActiveList = await list.save()
      user.activeList = newActiveList.id
      user.save()
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

activeProtosRouter.post('/delete/:id', async (req, res, next) => {
  const activeListId = req.params.id
  const { protoId, userId } = req.body
  try {
    const activeList = await ActiveProtos.findById(activeListId)
    activeList.activeProtos = activeList.activeProtos.filter(proto => proto.id !== protoId)
    if (activeList.activeProtos.length === 0) {
      await ActiveProtos.findByIdAndDelete(activeListId)
      await Users.findByIdAndUpdate(userId, { activeList: null })
      return res.status(201).json(null)
    }
    else {
      await activeList.save()
      return res.status(201).json(activeList)
    }
  } catch (error) {
    console.log('In delete one from list', error)
    next(error)
  }
})


//ActiveProto job routes
activeProtosRouter.put('/job/complete/:id', async (req, res, next) => {
  const activeListId = req.params.id
  const { protoId, jobId, isComplete } = req.body
  try {
    const result = await ActiveProtos.findByIdAndUpdate(activeListId,
      { $set: { "activeProtos.$[outer].jobs.$[inner].isComplete": !isComplete } },
      {
        "arrayFilters": [{ "outer.id": protoId }, { "inner._id": jobId }],
        new: true,
      }
    )
    console.log(result)
    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

activeProtosRouter.put('/job/delete/:id', async (req, res, next) => {
  const activeListId = req.params.id
  const { protoId, jobId } = req.body
  try {
    const result = await ActiveProtos.findByIdAndUpdate(activeListId,
      { $pull: { "activeProtos.$[outer].jobs": { _id: jobId } } },
      {
        "arrayFilters": [{ "outer.id": protoId }, { "inner._id": jobId }],
        new: true,
      }
    )
    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = activeProtosRouter