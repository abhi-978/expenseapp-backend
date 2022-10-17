const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is mandatory'],
    unique: true,
    validate: {
      validator: function (value) {
        return isEmail(value);
      },
      message: function () {
        return 'Invalid email format';
      },
    },
  },
  password: {
    type: String,
    required: [true, 'password is mandatory'],
    minlength: [8, 'Password should be minimum 8 characters'],
    maxlength: [64, 'Password should be maximum 64 characters'],
  },
});

userSchema.methods.encryptPassword = function () {
  const user = this;
  return bcrypt.genSalt().then((salt) => {
    return bcrypt.hash(user.password, salt).then((encryptedPassword) => {
      user.password = encryptedPassword;
      return user.save();
    });
  });
};

userSchema.methods.verifyPassword = function (password) {
  const user = this;
  return bcrypt.compare(password, user.password).then((match) => {
    if (match) {
      // return Promise.resolve(user);
      return new Promise((resolve, reject) => {
        resolve(user);
      });
    } else {
      // return Promise.reject({ notice: 'invalid email or password' });
      return new Promise((resolve, reject) => {
        reject({ message: 'invalid email or password' });
      });
    }
  });
};

userSchema.methods.generateToken = function () {
  const user = this;
  const tokenData = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(tokenData, 'clear2enter', {
    expiresIn: '2d',
  });
  return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
