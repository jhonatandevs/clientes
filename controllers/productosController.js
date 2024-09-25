const Productos = require('../models/Productos');
// agrega nuevos productos
exports.nuevoProducto = async (req, response, nect) => {
    const producto = new Productos(req.body);
    try {
        await producto.save();
        response.json({
            mensaje:'Se agregó el producto correctamente'
        })
    }
    catch (error) {
        console.log(error)
        next();
    }
}