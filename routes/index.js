// index.js (assuming Mongoose is updated)
const express= require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController'); // Asegúrate de la ruta correcta
const productosController = require('../controllers/productosController'); // Asegúrate de la ruta correcta

module.exports = function(){
// Clientes
    router.post('/clientes',clienteController.nuevoCliente);
    router.get('/clientes',clienteController.mostrarClientes)
    router.get('/clientes/:idCliente',clienteController.mostrarCliente)
    router.put('/clientes/:idCliente',clienteController.actualizarCliente)
    router.delete('/clientes/:idCliente',clienteController.eliminarCliente)


// Productos
router.post('/productos',productosController.nuevoProducto);


    return router;
}


