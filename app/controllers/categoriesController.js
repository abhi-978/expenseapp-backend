const Category = require('../models/category');
const Expense = require('../models/expense');
const ObjectId = require('mongoose').Types.ObjectId;

const categoriesController = {};

categoriesController.list = (req, res) => {
  const userId = req.user._id;
  Category.find({ userId })
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.json(err);
    });
};

categoriesController.create = (req, res) => {
  const body = req.body;
  const userId = req.user._id;
  const category = new Category(body);
  category.userId = userId;
  category
    .save()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
};

categoriesController.show = (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  Category.findOne({ _id: id, userId: userId })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
};

categoriesController.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const userId = req.user._id;
  Category.findOneAndUpdate(
    { _id: id, name: { $not: { $eq: 'uncategorized' } }, userId: userId },
    body,
    {
      new: true,
      runValidators: true,
    }
  )
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
};

categoriesController.remove = (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  Category.findOne({ userId: userId, name: 'uncategorized' }).then(
    (category) => {
     
      category
        .transferExpenses(id)
        .then((response) => {
          return Category.findOneAndDelete({
            _id: id,
            name: { $not: { $eq: 'uncategorized' } },
          });
        })
        .then((category) => {
          res.json(category);
        })
        .catch((err) => {
          res.json(err);
        });
    }
  );
};

module.exports = categoriesController;
