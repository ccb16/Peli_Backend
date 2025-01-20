const express = require('express');
const router = express.Router();
const { register, login, listUsers, editUser } = require('../controllers/authController');

// Rutas de autenticación y usuarios
router.post('/register', register);
router.post('/login', login);
router.get('/users', listUsers);
router.put('/users/:id', editUser);

module.exports = router;
