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
      totalJobsCompleted: 0,
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

module.exports = userStatsRouter;
