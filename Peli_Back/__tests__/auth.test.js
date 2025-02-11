const request = require('supertest');
const app = require('../app');

describe('Auth API Tests', () => {

  test('Deberia registrar un nuevo usuario', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        "nombre": 'carlos',
        "apellido": 'Romero',
        "email": 'carlos@hotmail.com',
        "username": 'carlo',
        "password": '1234',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuario registrado exitosamente');
  });

  test('Deberia iniciar sesión con credenciales válidas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        "username": 'gian',
        "password": '1234'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('id');
    expect(res.body.message).toBe('Inicio de sesión exitoso');
  });

  test('Deberia obtener datos del usuario por ID', async () => {
    const id = 1; // Asegúrate de que este ID exista en la BD

    const res = await request(app).get(`/api/auth/users/${id}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id', id);
    expect(res.body[0]).toHaveProperty('nombre');
    expect(res.body[0]).toHaveProperty('apellido');
    expect(res.body[0]).toHaveProperty('email');
    expect(res.body[0]).toHaveProperty('username');
    expect(res.body[0]).toHaveProperty('password');
    expect(res.body[0]).toHaveProperty('created_at');
  });
});