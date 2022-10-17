const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/usersController');
const categoriesController = require('../app/controllers/categoriesController');
const expensesController = require('../app/controllers/expensesController');
const budgetController = require('../app/controllers/budgetController');
const { authenticateUser } = require('../app/middlewares/authentication');

router.post('/users/register', usersController.register);
router.post('/users/login', usersController.login);
router.get('/users/account', authenticateUser, usersController.account);
router.post(
  '/users/profile/image',
  authenticateUser,
  usersController.saveProfileImage
);

router.get('/api/categories', authenticateUser, categoriesController.list);
router.get('/api/categories/:id', authenticateUser, categoriesController.show);
router.post('/api/categories', authenticateUser, categoriesController.create);
router.put(
  '/api/categories/:id',
  authenticateUser,
  categoriesController.update
);
router.delete(
  '/api/categories/:id',
  authenticateUser,
  categoriesController.remove
);

router.get('/api/expenses', authenticateUser, expensesController.list);
router.get(
  '/api/expenses/deleted',
  authenticateUser,
  expensesController.listRemoved
);
router.put(
  '/api/expenses/restore/:id',
  authenticateUser,
  expensesController.restoreRemoved
);
router.get('/api/expenses/:id', authenticateUser, expensesController.show);
router.post('/api/expenses', authenticateUser, expensesController.create);
router.put('/api/expenses/:id', authenticateUser, expensesController.update);
router.delete('/api/expenses/:id', authenticateUser, expensesController.remove);

router.get('/api/budget/:id', budgetController.show);
router.post('/api/budget', authenticateUser, budgetController.create);
router.put('/api/budget/:id', authenticateUser, budgetController.update);

module.exports = router;
