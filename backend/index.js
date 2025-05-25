require("dotenv").config;
const cors = require("cors");
// Conexión db
require('./config/db');

// Config de app
const app = require('express')();
const port = 3000;
// Importo los endpoints
const UserRouter = require('./api/User');

// Habilito CORS 
const bodyParser = require('express').json;
app.use(bodyParser());
app.use(cors());

// Agrego el prefijo /user/
app.use('/user', UserRouter)

// Inicia el servidor
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

// Función para cerrar el servidor
function closeServer() {
    server.close();
}

// Exporto app y función de cerrado de sv
module.exports = { app, closeServer };