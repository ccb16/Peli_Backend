const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');

// Registro de usuario
exports.register = (req, res) => {
  const { nombre, apellido, username, email, password } = req.body;
  if (!nombre || !apellido || !username || !email || !password) {
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
    res.status(200).json({ message: 'Inicio de sesión exitoso', token, id});
  });
};

// Listado de usuarios
exports.UserById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT id, nombre, apellido, username, email FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener el usuario', error: err });
    res.status(200).json(results);
  });

};
// Editar usuario
exports.editUser = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, username, email, password } = req.body;

  // Verificar que se haya enviado al menos un campo para actualizar
  if (!id || !(nombre || apellido || username || email || password)) {
    return res.status(400).json({ message: 'Faltan campos para actualizar' });
  }

  const fields = [];
  const values = [];

  // Añadir los campos a actualizar si están presentes
  if (nombre) {
    fields.push('nombre = ?');
    values.push(nombre);
  }
  if (apellido) {
    fields.push('apellido = ?');
    values.push(apellido);
  }
  if (username) {
    fields.push('username = ?');
    values.push(username);
  }
  if (email) {
    fields.push('email = ?');
    values.push(email);
  }
  if (password) {
    fields.push('password = ?');
    values.push(bcrypt.hashSync(password, 10)); // Hashear la nueva contraseña
  }

  // Añadir el id al final de los valores
  values.push(id);

  // Construir la consulta SQL para actualizar el usuario
  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  db.query(query, values, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al actualizar usuario', error: err });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  });
};