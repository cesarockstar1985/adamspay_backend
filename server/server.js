const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require("body-parser");

const path = require('path');
const { dbConnection } = require('./config');
const fileUpload = require('express-fileupload');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

dbConnection()

// Middlewares
app.use(bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    }
  }));
app.use( cors() )
app.use( express.json() )
app.use( express.static(publicPath) );
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/pedidos', require('./routes/pedidos'))
app.use('/user', require('./routes/usuarios'))

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});