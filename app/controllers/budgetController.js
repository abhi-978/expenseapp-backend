const Budget = require('../models/budget');

const budgetController = {};

budgetController.create = (req, res) => {
  const body = req.body;
  const budget = new Budget(body);
  budget
    .findByUser(body.userId)
    .then((savedBudget) => {
      if (savedBudget) {
        res.json(savedBudget);
      } else {
        return budget.save();
      }
    })
    .then((budget) => {
      res.json(budget);
    })
    .catch((err) => {
      res.json(err);
    });
};

budgetController.show = (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  Budget.findOne({ _id: id, userId: userId })
    .then((budget) => {
      res.json(budget);
    })
    .catch((err) => {
      res.json(err);
    });
};

budgetController.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const userId = req.user._id;
  Budget.findOneAndUpdate({ userId: userId, _id: id }, body, {
    new: true,
    runValidators: true,
  })
    .then((budget) => {
      res.json(budget);
    })
    .catch((err) => {
      res.json(err);
    });
};



module.exports = budgetController;
