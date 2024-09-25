const Pedidos = require("../models/Pedidos");

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({
            mensaje: 'Se agregó un nuevo pedido'
        })
    }
    catch (error) {
        /**El código 409 Conflict se utiliza cuando hay un conflicto que impide que la solicitud sea completada */
        res.status(409)
        res.json(
            {
                mensaje: 'Error pedido'
            }
        )
    }
}

exports.mostrarPedidos = async (req, res, next) => {
    try {
        /** Aplico un Populate, para hacer el join de la tabla de clientes con pedidos y mostrar los datos del cliente 
         * en lugar de su id */
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.status(200).json(pedidos)
    }
    catch (error) {
        res.status(500).json({
            mensaje: `Ocurrio un error ${error}`
        })
    }
}
exports.mostrarPedido = async (req, res, next) => {
    try {
        const idPedido = req.params.idPedido;
        const pedido = await Pedidos.findById(idPedido).populate('cliente').populate({
            path: "pedido.producto",
            model: 'Productos'
        });
        if (!pedido) {
            res.json({
                mensaje: 'Pedido no existe'
            });
            next()
        }
        res.json(pedido);
    }
    catch (error) {
        res.status(500)
        res.json({
            mensaje: 'Ocurrió un error'
        })
    }
}

/** Actualizar un pedido por id */
exports.actualizarPedido = async (req, res, next) => {
    try {
       const idPedido=req.params.idPedido;
        const pedido = await Pedidos.findOneAndUpdate({_id:idPedido},req.body,
            {
            new:true,
            runValidators: true
        }).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.json(pedido);
    }
    catch (error) {
        res.status(500)
        res.json({
            mensaje: 'Ocurrió un error'+error
        })
    }
}

/** Eliminar un peddo por id */
exports.eliminarPedido = async (req, res, next) => {
    try {
       const idPedido=req.params.idPedido;
        const pedido = await Pedidos.findOneAndDelete({_id:idPedido});
        res.json({
            mensaje:'Eliminado con exito'
        });
    }
    catch (error) {
        res.status(500)
        res.json({
            mensaje: 'Ocurrió un error'+error
        })
    }
}