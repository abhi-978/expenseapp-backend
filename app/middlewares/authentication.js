const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateUser = (req, res, next) => {
  let tokenData;
  const token = req.header('Authorization');
  try {
    tokenData = jwt.verify(token, 'clear2enter');
    User.findById(tokenData._id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = { authenticateUser };
