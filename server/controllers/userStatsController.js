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
      totalProtosCompleted: 0,
      totalJobsCompleted: [],
      dayStreak: {
        date: new Date(),
        streak: 0,
      },
    });
    const userStats = await userStatsCreated.save()
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
          dayStreak:
          {
            date: dateOfCurrentLogIn,
            streak: currentUserStats.dayStreak.streak + 1,
          },
        },
      );
      await isOnSteak.save();
      res.status(201).json(isOnSteak);
    }
    else if (dateOfCurrentLogIn.getDay() === dateOfPreviousLogIn + 2) {
      const hasBrokenStreak = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        {
          dayStreak:
          {
            date: dateOfCurrentLogIn,
            streak: 0,
          },
        },
      );
      await hasBrokenStreak.save();
      res.status(201).json(hasBrokenStreak);
    }
    else {
      res.status(201).json(currentUserStats);
    }
  } catch (error) {
    next(error);
  }
});

// Complete is coming in as the opposite of its click
// (click 'complete' on the job and it comes in as false)

userStatsRouter.put('/update-jobs/:id', async (req, res, next) => {
  const currentUserStats = await UserStats.findOne({ userId: req.params.id });
  const { jobTitle, isComplete } = req.body;
  console.log('Job stats', isComplete)
  let jobExists = false;
  currentUserStats.totalJobsCompleted.forEach((job) => {
    if (job.jobTitle === jobTitle) {
      jobExists = true;
    }
  })
  try {
    if (!isComplete && jobExists) {
      console.log('first if')
      const incJobCompleteCount = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        { $inc: { 'totalJobsCompleted.$[outer].timesCompleted': 1 } },
        {
          arrayFilters: [{ 'outer.jobTitle': jobTitle }],
        },
      );
      await incJobCompleteCount.save();
      res.status(201).json(incJobCompleteCount);
    }
    else if (isComplete && jobExists) {
      console.log('first else if')
      const decJobCompleteCount = await UserStats.findOneAndUpdate(
        { userId: req.params.id },
        { $inc: { 'totalJobsCompleted.$[outer].timesCompleted': -1 } },
        {
          arrayFilters: [{ 'outer.jobTitle': jobTitle }],
        },
      );
      await decJobCompleteCount.save();
      res.status(201).json(decJobCompleteCount);
    }
    else if (!jobExists && !isComplete) {
      console.log('last else if', jobExists)
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

module.exports = userStatsRouter;
