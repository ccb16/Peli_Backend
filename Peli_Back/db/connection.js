const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error(`Error al conectar con MySQL ${process.env.DB_NAME}:`, err.message);
  } else {
    console.log(`Conectado con la base de datos: ${process.env.DB_NAME} en MySQL`);
  }
});

module.exports = db;
