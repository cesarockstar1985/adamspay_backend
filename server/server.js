const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const http = require('http');

const path = require('path');
const { dbConnection } = require('./config');
const fileUpload = require('express-fileupload');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

dbConnection()

// Middlewares
app.use( cors() )
app.use( express.json() )
app.use( express.static(publicPath) );
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/salas', require('./routes/salas'))
app.use('/user', require('./routes/usuarios'))

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});