const request = require('supertest');
// Importo app y función para cerrar el server
const { app, closeServer } = require ('./index');
// mongodb user model
const { User } = require('./models/User');

// Defino pruebas
describe('Endpoints de la API', () => {

    // Prueba para el endpoint /signup
    test('POST /signup debería crear nuevo usuario', async () => {
    const userData = {
        username: 'testuser',
        email: process.env.EMAIL,
        password: 'Testpassword'
      };
  
      const response = await request(app)
        .post('/user/signup')
        .send(userData);
  
      expect(response.status).toBe(201); // Espera respuesta 201
      expect(response.body).toEqual({ message: "Usuario creado correctamente!" });
    });
  
  // Prueba para el endpoint /signin
  test('POST /signin debería hacer un login valido', async () => {
    const userData = {
    email: process.env.EMAIL,
    password: 'Testpassword'
    };

    // Intentar iniciar sesión con las credenciales
    const response = await request(app)
    .post('/user/signin')
    .send(userData);

    expect(response.status).toBe(200); // Esperamos un código de estado 200 (OK)
    expect(response.body).toHaveProperty('data'); // Esperamos que la respuesta contenga un token de auth
    expect(response.body).toEqual({ data: expect.any(String), message: "Inicio de sesión exitoso!" });
  });

  // Prueba para el endpoint /forgot-password
  test('POST /forgot-password Debería enviar un correo', async () => {
    const existingUser = {
      email: process.env.EMAIL
    };

    // Intentar enviar un correo de restablecimiento de contraseña
    const response = await request(app)
      .post('/user/forgot-password')
      .send({ email: existingUser.email });

    expect(response.status).toBe(200); // Esperamos un código de estado 200 (OK)
    expect(response.body).toEqual({ message: "Correo enviado con éxito!" });
  });

  // Prueba para el endpoint /delete
  test('POST /delete Debería eliminar un usuario existente', async () => {
    const user = await User.findOne({ email: process.env.EMAIL });
    // Intentar eliminar el usuario existente
    const deleteUserResponse = await request(app)
      .post('/user/delete')
      .send({ id: user._id }); // Enviamos el _id del usuario creado

    expect(deleteUserResponse.status).toBe(200); // Esperamos un código de estado 200 (OK)
    expect(deleteUserResponse.body).toEqual({ message: "Usuario eliminado con éxito!" });
  });

  // Después de todas las pruebas, cierra la aplicación
  afterAll(() => {
    closeServer();
    });
});