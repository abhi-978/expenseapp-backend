const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    default: 5000,
    required: [true, 'Budget Balance is required'],
    min: 0,
  },
});

budgetSchema.methods.findByUser = function (id) {
  return Budget.findOne({ userId: id });
};

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
