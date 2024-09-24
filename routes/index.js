// index.js (assuming Mongoose is updated)
const express= require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController'); // Asegúrate de la ruta correcta

module.exports = function(){
    router.post('/clientes',clienteController.nuevoCliente);
    router.get('/clientes',clienteController.mostrarClientes)
    router.get('/clientes/:idCliente',clienteController.mostrarCliente)
    router.put('/clientes/:idCliente',clienteController.actualizarCliente)
    return router;
}
