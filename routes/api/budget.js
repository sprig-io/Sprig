const express = require('express');
const router = express.Router();
const Budget = require('../../models/Budget');

//Add a budget

router.post('/', async (req, res, next) => {
  try {
    const budget = await Budget.findOne({ userId: req.body.userId });
    if (budget) {
      await Budget.updateOne({
        userId: req.body.userId,
        $set: { monthlyGoal: req.body.monthlyGoal },
      });
      const budget = await Budget.findOne({
        userId: req.body.userId,
      });
      res.send(budget.monthlyGoal);
    } else {
      const newBudget = new Budget({
        userId: req.body.userId,
        monthlyGoal: req.body.monthlyGoal,
      });
      await newBudget.save();
      res.send(newBudget.monthlyGoal);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const budget = await Budget.findOne({ userId: req.params.userId });
    if (budget) {
      res.send(budget);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
