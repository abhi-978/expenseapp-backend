const mongoose = require('mongoose');

const configureDB = () => {
  mongoose
    .connect('mongodb://localhost:27017/expense-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connnected to db');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = configureDB;
