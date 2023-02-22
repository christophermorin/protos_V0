/* eslint-disable linebreak-style */
const userStatsRouter = require('express').Router();
const Protos = require('../models/ProtosModel');
const Users = require('../models/UserModel');
const UserStats = require('../models/UserStats');
const logger = require('../utils/logger');

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
    if (dateOfCurrentLogIn.getDay() === dateOfPreviousLogIn + 1) {
      const isOnSteak = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        {
          daysWorked: currentUserStats.daysWorked += 1,
          dayStreak:
          {
            date: dateOfCurrentLogIn,
            $inc: { streak: 1 },
            // streak: currentUserStats.dayStreak.streak += 1,
          },
        },
      );
      await isOnSteak.save();
      res.status(201).json(isOnSteak);
    } else if (dateOfCurrentLogIn.getDay() === dateOfPreviousLogIn + 2) {
      const hasBrokenStreak = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        {
          daysWorked: currentUserStats.daysWorked += 1,
          dayStreak:
          {
            date: dateOfCurrentLogIn,
            $inc: { streak: -1 },
            // streak: 1,
          },
        },
      );
      await hasBrokenStreak.save();
      res.status(201).json(hasBrokenStreak);
    } else {
      res.status(201).json(currentUserStats);
    }
  } catch (error) {
    next(error);
  }
});

userStatsRouter.put('/update-jobs/:id', async (req, res, next) => {
  const currentUserStats = await UserStats.findOne({ userId: req.params.id });
  const { jobTitle, isComplete } = req.body;
  let jobExists = false;
  currentUserStats.totalJobsCompleted.forEach((job) => {
    if (job.jobTitle === jobTitle) {
      jobExists = true;
    }
  });
  try {
    if (isComplete && jobExists) {
      const incJobCompleteCount = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        { $inc: { 'totalJobsCompleted.$[outer].timesCompleted': 1 } },
        {
          arrayFilters: [{ 'outer.jobTitle': jobTitle }],
        },
      );
      await incJobCompleteCount.save();
      res.status(201).json(incJobCompleteCount);
    } else if (!isComplete && jobExists) {
      const decJobCompleteCount = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        { $inc: { 'totalJobsCompleted.$[outer].timesCompleted': -1 } },
        {
          arrayFilters: [{ 'outer.jobTitle': jobTitle }],
        },
      );
      await decJobCompleteCount.save();
      res.status(201).json(decJobCompleteCount);
    } else if (!jobExists && isComplete) {
      const addingJob = {
        jobTitle,
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
  const { protoTitle, isComplete } = req.body;
  let protoExists = false;
  currentUserStats.totalProtosCompleted.forEach((proto) => {
    if (proto.protoTitle === protoTitle) {
      protoExists = true;
    }
  });
  try {
    if (isComplete && protoExists) {
      const incProtoCompleteCount = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        { $inc: { 'totalProtosCompleted.$[outer].timesCompleted': 1 } },
        {
          arrayFilters: [{ 'outer.protoTitle': protoTitle }],
        },
      );
      await incProtoCompleteCount.save();
      res.status(201).json(incProtoCompleteCount);
    } else if (!protoExists && isComplete) {
      const addingProto = {
        protoTitle,
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
