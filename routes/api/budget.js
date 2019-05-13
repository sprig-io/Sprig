const express = require('express');
const router = express.Router();
const Budget = require('../../models/Budget');

//Add a budget

router.post('/', async (req, res, next) => {
  try {
    const budget = new Budget({
      userId: req.body.userId,
      monthlyGoal: req.body.monthlyGoal,
    });
    await budget.save();
    res.send(budget);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const budget = await Budget.findOne({ userId: req.body.userId });
    res.send(budget);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
