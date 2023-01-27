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
// Creating a new active protos list
activeProtosRouter.post('/', async (req, res, next) => {
  const userId = req.body.user
  const selectedProtos = req.body.selectedProtos
  try {
    const user = await Users.findById(userId)
    if (user) {
      const activeProtos = new ActiveProtos({
        activeProtos: selectedProtos,
        user: user._id
      })
      const newActiveList = await activeProtos.save()
      user.activeList = newActiveList.id
      await user.save()
      return res.status(201).json(newActiveList)
    }
  } catch (error) {
    logger.error('In creating new active protos list', error)
    next(error)
  }
})
// Add one proto to active protos list
activeProtosRouter.put('/add-one/:id', async (req, res) => {
  const activeProtosId = req.params.id
  const newProto = req.body
  try {
    const activeList = await ActiveProtos.findOneAndUpdate({ _id: activeProtosId }, { $push: { activeProtos: newProto } })
    return res.status(201).json(activeList)
  } catch (error) {
    console.log(error)
  }
})
// Add many protos to active list
activeProtosRouter.put('/add-many/:id', async (req, res, next) => {
  const activeProtoId = req.params.id
  const newProtos = req.body
  try {
    const activeList = await ActiveProtos.findOneAndUpdate({ _id: activeProtoId },
      { $addToSet: { activeProtos: { $each: [...newProtos] } } }, { new: true })
    return res.status(201).json(activeList)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// Delete one proto from active list
activeProtosRouter.post('/delete-one/:id', async (req, res, next) => {
  const activeListId = req.params.id
  const { protoId, userId } = req.body
  try {
    const activeList = await ActiveProtos.findById(activeListId)
    activeList.activeProtos = activeList.activeProtos.filter(proto => proto._id !== protoId)
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
// Delete/Clear active protos list
activeProtosRouter.delete('/delete-many/:id', async (req, res, next) => {
  const activeListId = req.params.id
  try {
    const activeList = await ActiveProtos.findByIdAndDelete(activeListId)
    await Users.findByIdAndUpdate(activeList.user, { activeList: null })
    return res.status(201).json(null)
  } catch (error) {
    console.log('In delete many from list')
    next(error)
  }
})

// Mark one proto complete
activeProtosRouter.put('/complete/:id', async (req, res, next) => {
  const activeListId = req.params.id
  const { protoId, isComplete } = req.body
  try {
    const result = await ActiveProtos.findByIdAndUpdate(activeListId,
      { $set: { "activeProtos.$[outer].isComplete": !isComplete } },
      {
        "arrayFilters": [{ "outer._id": protoId }],
        new: true,
      }
    )
    console.log(result)
    return res.status(200).json(result.activeProtos)
  } catch (error) {
    next(error)
  }
})

// *********************************************************************
//  ActiveProto job routes
// *********************************************************************

// Complete one job
activeProtosRouter.put('/job/complete/:id', async (req, res, next) => {
  const activeListId = req.params.id
  const { protoId, jobId, isComplete } = req.body
  try {
    const result = await ActiveProtos.findByIdAndUpdate(activeListId,
      { $set: { "activeProtos.$[outer].jobs.$[inner].isComplete": !isComplete } },
      {
        "arrayFilters": [{ "outer._id": protoId }, { "inner._id": jobId }],
        new: true,
      }
    )
    console.log(result)
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})
//Delete one job
activeProtosRouter.put('/job/delete/:id', async (req, res, next) => {
  const activeListId = req.params.id
  const { protoId, jobId } = req.body
  try {
    const result = await ActiveProtos.findByIdAndUpdate(activeListId,
      { $pull: { "activeProtos.$[outer].jobs": { _id: jobId } } },
      {
        "arrayFilters": [{ "outer._id": protoId }, { "inner._id": jobId }],
        new: true,
      }
    )
    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = activeProtosRouter