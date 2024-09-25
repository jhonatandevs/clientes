// index.js (assuming Mongoose is updated)
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController'); // Asegúrate de la ruta correcta
const productosController = require('../controllers/productosController'); // Asegúrate de la ruta correcta
const pedidosController = require('../controllers/pedidosController'); // Asegúrate de la ruta correcta

module.exports = function () {
    // Clientes
    router.post('/clientes', clienteController.nuevoCliente);
    router.get('/clientes', clienteController.mostrarClientes)
    router.get('/clientes/:idCliente', clienteController.mostrarCliente)
    router.put('/clientes/:idCliente', clienteController.actualizarCliente)
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente)


    // Productos
    router.post('/productos', productosController.subirArchivo
        , productosController.nuevoProducto);
    router.get('/productos', productosController.mostrarProductos)
    router.get('/productos/:idProducto', productosController.mostrarProductosPorId)
    router.put('/productos/:idProducto', productosController.subirArchivo,
        productosController.actualizarProducto)
    router.delete('/productos/:idProducto', productosController.eliminarProducto)


    //Pedidos
    router.post('/pedidos', pedidosController.nuevoPedido);
    router.get('/pedidos', pedidosController.mostrarPedidos)
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido)
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido)
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido)

    return router;
}


