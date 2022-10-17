const mongoose = require('mongoose');
const Expense = require('../models/expense');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId;

const categorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Category name is a required'],
  },
});

categorySchema.methods.transferExpenses = function (id) {
  const category = this;
  return Expense.updateMany(
    { categoryId: new ObjectId(id) },
    { categoryId: new ObjectId(category._id) }
  );
};



const Category = mongoose.model('Category', categorySchema);
module.exports = Category;

