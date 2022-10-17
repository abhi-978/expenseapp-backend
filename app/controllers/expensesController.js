const Expense = require('../models/expense');

const expenseController = {};

expenseController.list = (req, res) => {
  const userId = req.user._id;
  Expense.find({ userId })
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => {
      res.json(err);
    });
};

expenseController.create = (req, res) => {
  const body = req.body;
  const userId = req.user._id;
  const expense = new Expense(body);
  expense.userId = userId;
  expense
    .save()
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

expenseController.show = (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  Expense.findOne({ _id: id, userId: userId })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

expenseController.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const userId = req.user._id;
  Expense.findOneAndUpdate({ _id: id, userId: userId }, body, {
    new: true,
    runValidators: true,
  })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

expenseController.remove = (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  Expense.findOne({ _id: id, userId: userId })
    .then((expense) => {
      return Expense.softDelete(expense);
    })
    .then((deletionCount) => {
      res.json(deletionCount);
    })
    .catch((err) => {
      res.json(err);
    });
};

expenseController.listRemoved = (req, res) => {
  Expense.findDeleted()
    .then((expenses) => {
      // return expenses.
      res.json(expenses);
    })
    .catch((err) => {
      res.json(err);
    });
};

expenseController.restoreRemoved = (req, res) => {
  const id = req.params.id;
  Expense.findDeleted()
    .then((expenses) => {
      const requiredExpense = expenses.find((expense) => expense._id === id);
      return Expense.restore(requiredExpense);
    })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = expenseController;
