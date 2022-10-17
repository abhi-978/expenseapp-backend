const User = require('../models/user');
const Category = require('../models/category');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../middlewares/upload');
const getImage = require('../helpers/getImage');

const usersController = {};

usersController.register = (req, res) => {
  const body = req.body;
  const user = new User(body);

  user
    .validate()
    .then(() => {
      return user.encryptPassword();
    })
    .then((user) => {
      return Category.create({ name: 'uncategorized', userId: user._id });
    })
    .then(() => {
      res.json(user);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
};

usersController.login = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: 'invalid email or password' });
      } else {
        return user.verifyPassword(body.password);
      }
    })
    .then((user) => {
      if (user) {
        const token = user.generateToken();
        res.json({ token });
      }
    })
    .catch((err) => {
      if (err.message) {
        res.status(400).json(err);
      } else res.json(err);
    });
};

usersController.account = (req, res) => {
  const user = req.user;
  const details = {
    email: user.email,
    _id: user._id,
    image: '',
  };
  getImage(user._id)
    .then((path) => {
      if (path) {
        details.image = 'http://localhost:3058/images/' + path;
      } else {
        details.image = '';
      }
      res.json(details);
    })
    .catch((err) => {
      console.log(err);
    });
};

usersController.saveProfileImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json(err);
    }
    res.json({ success: 'file uploaded successfully' });
  });
};

usersController.logout = (req, res) => {};

module.exports = usersController;
