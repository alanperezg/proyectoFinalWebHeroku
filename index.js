'use-strict'
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');

const { mesaController } = require('./controllers/mesaController');
const { meseroController } = require('./controllers/meseroController');
const { productoController } = require('./controllers/productoController');
const { categoriaController } = require('./controllers/categoriaController');
const { ordenController } = require('./controllers/ordenController');
const { ordenProductoController } = require('./controllers/ordenProductoController');
const { clienteController } = require('./controllers/clienteController');
const { usuarioController } = require('./controllers/usuarioController');
const { authMWController } = require('./controllers/authMWController');


const app = express();
const port = process.env.PORT || 80;

let jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());

app.get('/api/mesas', authMWController.authenticate, mesaController.get);
app.get('/api/meseros', authMWController.authenticate, meseroController.get);
app.get('/api/productos', authMWController.authenticate, productoController.get)
app.get('/api/categorias', authMWController.authenticate, categoriaController.get)
app.get('/api/ordenes/:id', authMWController.authenticate, ordenController.getOne);
app.route('/api/ordenes').get(authMWController.authenticate, ordenController.get)
app.get('/api/ordenes/:id/productos', authMWController.authenticate, ordenProductoController.get);
app.patch('/api/ordenes/:id', authMWController.authenticate, ordenController.patch);
app.route('/api/ordenproductos/:id')
.delete(authMWController.authenticate, ordenProductoController.delete)
.patch(authMWController.authenticate, ordenProductoController.patch);
app.post('/api/abrirorden', authMWController.authenticate, ordenController.abrirOrden);
app.patch('/api/cerrarorden/:id', authMWController.authenticate, ordenController.cerrarOrden);
app.post('/api/ordenproductos', authMWController.authenticate, ordenProductoController.post);
app.get('/api/clientes', authMWController.authenticate, clienteController.get);
app.post('/api/login', usuarioController.login);
app.get('/api/logout', usuarioController.logout);
app.get('*', (req, res) =>{
    res.sendfile(__dirname + '/public/index.html');
});
app.listen(port);
