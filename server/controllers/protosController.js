const jwt = require('jsonwebtoken');
const { default: mongoose, mongo } = require('mongoose');
const protosRouter = require('express').Router();
const Protos = require('../models/ProtosModel');
const Users = require('../models/UserModel');

// Getting token from request
const getTokenFrom = (req) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// Getting all users protos
protosRouter.get('/:id', async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  try {
    res.status(200).json(user.protos);
  } catch (error) {
    next(error);
  }
});

// Creating one new proto
protosRouter.post('/', async (req, res, next) => {
  const token = await getTokenFrom(req);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await Users.findById(decodedToken.id);
    // const userProtos = await Protos.find({ user: user.id })
    const protoExisting = user.protos.find((proto) => proto.title === req.body.title);
    if (protoExisting) {
      return res.status(400).json({
        error: 'proto by that title already exists',
      });
    }
    const newProto = new Protos(
      {
        ...req.body,
        user: user.id,
      },
    );
    console.log(newProto);
    user.protos.push(newProto);
    await user.save();
    return res.status(201).json(newProto);
  } catch (error) {
    next(error);
  }
  return null;
});

// Delete one proto
protosRouter.put('/:id', async (req, res, next) => {
  const user = req.params.id;
  const { proto } = req.body;
  try {
    const result = await Users.findByIdAndUpdate(
      user,
      { $pull: { protos: { title: proto } } },
    );
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
  return null;
});

module.exports = protosRouter;
