/* eslint-disable linebreak-style */
const userStatsRouter = require('express').Router();
const Protos = require('../models/ProtosModel');
const Users = require('../models/UserModel');
const UserStats = require('../models/UserStats');
const logger = require('../utils/logger');

userStatsRouter.get('/:id', async (req, res, next) => {
  try {
    const userStats = await UserStats.findOne({ userId: req.params.id });
    res.status(200).json(userStats);
  } catch (error) {
    next(error);
  }
});

userStatsRouter.post('/initialize-stats/:id', async (req, res, next) => {
  try {
    const userStatsCreated = new UserStats({
      userId: req.params.id,
      username: req.body.username,
      totalProtosCompleted: [],
      totalJobsCompleted: [],
      daysWorked: 1,
      dayStreak: {
        date: new Date(),
        streak: 1,
      },
    });
    const userStats = await userStatsCreated.save();
    logger.info(`User stats for ${userStats.userId} created`);
    res.status(201).json(userStats);
  } catch (error) {
    next(error);
  }
});

userStatsRouter.put('/check-streak/:id', async (req, res, next) => {
  const currentUserStats = await UserStats.findOne({ userId: req.params.id });
  const dateOfCurrentLogIn = new Date();
  try {
    const dateOfPreviousLogIn = currentUserStats.dayStreak.date.getDay();
    if (dateOfCurrentLogIn.getDay() === dateOfPreviousLogIn) {
      console.log('No change to streak');
      res.status(201).json(currentUserStats);
    } else if (dateOfCurrentLogIn.getDay() === dateOfPreviousLogIn + 1) {
      console.log('Is on streak');
      const isOnSteak = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        {
          daysWorked: currentUserStats.daysWorked += 1,
          dayStreak:
          {
            date: dateOfCurrentLogIn,
            streak: currentUserStats.dayStreak.streak += 1,
          },
        },
      );
      await isOnSteak.save();
      res.status(201).json(isOnSteak);
    } else if (dateOfCurrentLogIn.getDay() !== dateOfPreviousLogIn + 1) {
      console.log('Has broken streak');
      const hasBrokenStreak = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        {
          daysWorked: currentUserStats.daysWorked += 1,
          dayStreak:
          {
            date: dateOfCurrentLogIn,
            streak: 1,
          },
        },
      );
      await hasBrokenStreak.save();
      res.status(201).json(hasBrokenStreak);
    }
  } catch (error) {
    next(error);
  }
});

userStatsRouter.put('/update-jobs/:id', async (req, res, next) => {
  const currentUserStats = await UserStats.findOne({ userId: req.params.id });
  const { title, isComplete } = req.body;
  let jobExists = false;
  currentUserStats.totalJobsCompleted.forEach((job) => {
    if (job.title === title) {
      jobExists = true;
    }
  });
  try {
    if (isComplete && jobExists) {
      const incJobCompleteCount = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        { $inc: { 'totalJobsCompleted.$[outer].timesCompleted': 1 } },
        {
          arrayFilters: [{ 'outer.title': title }],
        },
      );
      await incJobCompleteCount.save();
      res.status(201).json(incJobCompleteCount);
    } else if (!isComplete && jobExists) {
      const decJobCompleteCount = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        { $inc: { 'totalJobsCompleted.$[outer].timesCompleted': -1 } },
        {
          arrayFilters: [{ 'outer.title': title }],
        },
      );
      await decJobCompleteCount.save();
      res.status(201).json(decJobCompleteCount);
    } else if (!jobExists && isComplete) {
      const addingJob = {
        title,
        timesCompleted: 1,
      };
      const firstTimeJobCompleted = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        { $push: { totalJobsCompleted: addingJob } },
      );
      await firstTimeJobCompleted.save();
      res.status(201).json(firstTimeJobCompleted);
    }
  } catch (error) {
    next(error);
  }
});

userStatsRouter.put('/update-protos/:id', async (req, res, next) => {
  const currentUserStats = await UserStats.findOne({ userId: req.params.id });
  const { title, isComplete } = req.body;
  let protoExists = false;
  currentUserStats.totalProtosCompleted.forEach((proto) => {
    if (proto.title === title) {
      protoExists = true;
    }
  });
  try {
    if (isComplete && protoExists) {
      const incProtoCompleteCount = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        { $inc: { 'totalProtosCompleted.$[outer].timesCompleted': 1 } },
        {
          arrayFilters: [{ 'outer.title': title }],
        },
      );
      await incProtoCompleteCount.save();
      res.status(201).json(incProtoCompleteCount);
    } else if (!protoExists && isComplete) {
      const addingProto = {
        title,
        timesCompleted: 1,
      };
      const firstTimeProtoCompleted = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        { $push: { totalProtosCompleted: addingProto } },
      );
      await firstTimeProtoCompleted.save();
      res.status(201).json(firstTimeProtoCompleted);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userStatsRouter;
