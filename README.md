# Sistema de Autenticación con Node.js, Express y MySQL (Backend)

Este es un backend desarrollado con Node.js y Express para gestionar la autenticación de usuarios, incluyendo registro, inicio de sesión y edición de datos. Utiliza MySQL como base de datos y bcrypt para la encriptación de contraseñas.

## Tecnologías Utilizadas
- Node.js
- Express
- MySQL
- bcrypt
- JWT (Json Web Token)
- dotenv
- Jest (para pruebas)
- supertest (para pruebas)

## Requisitos Previos
Antes de ejecutar el proyecto, asegúrese de tener instalado:
- Node.js
- MySQL
- Un gestor de dependencias (npm o yarn)

## Instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/ccb16/Peli_Backend.git
   cd Peli_Backend
   ```

2. Instalar dependencias:
   ```sh
   npm install
   ```

3. Configurar la base de datos:
   - Crear una base de datos en MySQL llamada `bd_Peli`.
   - Importar la estructura de la tabla `users`:
     ```sql
     CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nombre VARCHAR(50) NOT NULL,
       apellido VARCHAR(50) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       username VARCHAR(50) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

4. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=contraseña_de_tu_base_de_datos
     DB_NAME= nombre_de_la_base_de_datos
     JWT_SECRET=tu_clave_secreta
     ```

## Ejecución del Servidor
Para iniciar el servidor, ejecute:
```sh
node server.js
```
Por defecto, el servidor correrá en `http://localhost:3000`.

## Endpoints Disponibles
### Autenticación
- **Registro de usuario**: `POST /api/auth/register`
  - **Body:**
    ```json
    {
      "nombre": "Carlos",
      "apellido": "Romero",
      "email": "carlos@hotmail.com",
      "username": "carlo",
      "password": "1234"
    }
    ```
  - **Respuesta:**
    ```json
    {
      "message": "Usuario registrado exitosamente"
    }
    ```

- **Inicio de sesión**: `POST /api/auth/login`
  - **Body:**
    ```json
    {
      "username": "gian",
      "password": "1234"
    }
    ```
  - **Respuesta:**
    ```json
    {
      "message": "Inicio de sesión exitoso",
      "token": "<JWT_TOKEN>",
      "id": 1
    }
    ```

- **Obtener usuario por ID**: `GET /api/auth/users/:id`
  - **Respuesta:**
    ```json
    [
      {
        "id": 1,
        "nombre": "Carlos",
        "apellido": "Romero",
        "email": "carlos@hotmail.com",
        "username": "carlo",
        "password": "$2b$10$...",
        "created_at": "2024-02-10 12:00:00"
      }
    ]
    ```

- **Editar usuario**: `PUT /api/auth/users/:id`
  - **Body:** (Se puede enviar uno o más campos)
    ```json
    {
      "nombre": "Carlos",
      "apellido": "Romero",
      "email": "nuevoemail@hotmail.com"
      "username": "carlo_11"
      "password": "ABC123"
    }
    ```
  - **Respuesta:**
    ```json
    {
      "message": "Datos actualizados exitosamente"
    }
    ```

## Pruebas
Para ejecutar las pruebas unitarias con `supertest`, ejecute:
```sh
npm test
```

   ```
## Licencia
Este proyecto está bajo la licencia MIT.

