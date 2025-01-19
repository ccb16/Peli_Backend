const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');

// Registro de usuario
exports.register = (req, res) => {
  const { nombre, apellido, username, email, password } = req.body;
  if (!nombre||!apellido ||!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (nombre, apellido, username, email, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, apellido, username, email, hashedPassword], (err) => {
    if (err) return res.status(500).json({ message: 'Error al registrar usuario', error: err });
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  });
};

// Login de usuario
exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al buscar usuario', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  });
};

// Listado de usuarios
exports.listUsers = (req, res) => {
  const query = 'SELECT id, nombre, apellido, username, email FROM users';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener usuarios', error: err });
    res.status(200).json(results);
  });
};
