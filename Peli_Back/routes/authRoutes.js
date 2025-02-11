const express = require('express');
const router = express.Router();
const { register, login, UserById, editUser } = require('../controllers/authController');

// Rutas de autenticación y usuarios
router.post('/register', register); 
router.post('/login', login);
router.get('/users/:id', UserById);
router.put('/users/:id', editUser);

module.exports = router;
