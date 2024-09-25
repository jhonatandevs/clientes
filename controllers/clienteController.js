const Clientes = require('../models/Clientes');
/**Agregar un nuevo Cliente */
exports.nuevoCliente = async (req, res) => {
    const cliente = new Clientes(req.body);
    try {
        await cliente.save();
        res.json({
            mensaje: 'Se agregó un nuevo cliente'
        })
    }
    catch (error) {
        /**El código 409 Conflict se utiliza cuando hay un conflicto que impide que la solicitud sea completada */
        res.status(409)
        res.json(
            {
                mensaje: 'Cliente repetido'
            }
        )
    }
}
/** Mostrar todo el listado de clientes */
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    }
    catch (error) {
        res.status(500)
        res.json({
            mensaje: 'Ocurrió un error'
        })
    }
}
/** Mostrar un cliente por id */
exports.mostrarCliente = async (req, res, next) => {
    try {
       const idCliente=req.params.idCliente;
        const cliente = await Clientes.findById(idCliente);
        if(!cliente){
            res.json({
                mensaje:'Cliente no existe'
            });
            next()
        }
        res.json(cliente);
    }
    catch (error) {
        res.status(500)
        res.json({
            mensaje: 'Ocurrió un error'
        })
    }
}
/** Actualizar un cliente por id */
exports.actualizarCliente = async (req, res, next) => {
    try {
       const idCliente=req.params.idCliente;
       console.log("Cliente id:  ",idCliente)
       console.log("Cliente BODY:  ",req.body)
        const cliente = await Clientes.findOneAndUpdate({_id:idCliente},req.body,
            {
            new:true,
            runValidators: true
        });
        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json(cliente);
    }
    catch (error) {
        res.status(500)
        res.json({
            mensaje: 'Ocurrió un error'+error
        })
    }
}
/** Eliminar un cliente por id */
exports.eliminarCliente = async (req, res, next) => {
    try {
       const idCliente=req.params.idCliente;
        const cliente = await Clientes.findOneAndDelete({_id:idCliente});
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
