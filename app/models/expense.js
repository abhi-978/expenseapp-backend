const mongoose = require('mongoose');
const isDate = require('validator/lib/isDate');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Expense',
    },
    amount: {
      type: Number,
      required: [true, 'Expense amount is required'],
      min: [1, 'Minimum amount is 1'],
    },
    date: {
      type: String,
      required: true,
      default: `${new Date().getFullYear()}-${String(
        new Date().getMonth()
      ).padStart(2, 0)}-${String(new Date().getDate()).padStart(2, 0)}`,
      validate: {
        validator: function (value) {
          return isDate(value);
        },
        message: function () {
          return 'Invalid Date';
        },
      },
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

expenseSchema.plugin(softDeletePlugin);

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
