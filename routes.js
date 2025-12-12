const express = require('express');
const authController = require('./authController');
const todoController = require('./todoController');
const { requireAuth, redirectIfAuthenticated } = require('./auth');

const router = express.Router();

// Root redirect
router.get('/', (req, res) => res.redirect('/login'));

// Authentication routes
router.get('/login', redirectIfAuthenticated, authController.getLogin);
router.get('/register', redirectIfAuthenticated, authController.getRegister);
router.post('/register', redirectIfAuthenticated, authController.postRegister);
router.post('/login', redirectIfAuthenticated, authController.postLogin);
router.post('/logout', authController.postLogout);

// Todo routes (protected)
router.get('/todos', requireAuth, todoController.getTodos);
router.get('/api/todos', requireAuth, todoController.getApiTodos);
router.post('/todos', requireAuth, todoController.createTodo);
router.post('/todos/:id/toggle', requireAuth, todoController.toggleTodo);
router.post('/todos/:id/edit', requireAuth, todoController.updateTodo);
router.post('/todos/:id/delete', requireAuth, todoController.deleteTodo);

module.exports = router;