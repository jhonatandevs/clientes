const Productos = require('../models/Productos');

const multer = require('multer')
const shortid = require('shortid')

const fs = require('fs');
const path = require('path');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }
        else cb(new Error('Formato no valido - controller 20'))
    }
}



/** Pasar la configuracion y el campo -  single('imagen'), donde imagen debe ser el nombre que le di en el modelo al campo */
const upload = multer(configuracionMulter).single('imagen')

/** Sube un archivo */
exports.subirArchivo = (req, res, next) => {
    // upload(req,res, function(error){
    //     if(error){
    //         res.json(error)
    //     }
    //     return next()
    // })
    upload(req, res, function (error) {
        if (error) {
            return res.status(400).json({
                mensaje: 'Hubo un error al subir el archivo',
                error: error.message
            });
        }
        next(); // Solo llamamos a next si no hubo errores en la subida
    });
}

// agrega nuevos productos
exports.nuevoProducto = async (req, response, next) => {
    const producto = new Productos(req.body);
    try {
        if (req?.file?.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        response.json({
            mensaje: 'Se agregó el producto correctamente'
        })
    }
    catch (error) {
        console.log(error)
        next();
    }
}

//Mostrar productos

exports.mostrarProductos = async (req, res, next) => {

    try {
        const productos = await Productos.find({})
        res.status(200).json(productos);
    }
    catch (error) {
        console.log(error)
        next();
    }
}
exports.mostrarProductosPorId = async (req, res, next) => {

    try {
        const producto = await Productos.findById(req.params.idProducto)
        if (!producto) {
            res.json({
                mensaje: 'Producto no existe'
            });
            next()
        }
        res.json(producto);
    }
    catch (error) {
        console.log(error)
        next();
    }
}
//Actualizar producto
exports.actualizarProducto = async (req, res, next) => {
    try {
        const idProducto = req.params.idProducto;
        let productoAnterior = await Productos.findById(idProducto);
        //Construyo un nuevo Producto, por REFRENCIA cuando cambie nuevoProducto, cambiará req.body
        let nuevoProducto = req.body;
        if (req?.file?.filename) {
            nuevoProducto.imagen = req.file.filename
        }
        else {
            nuevoProducto.imagen = productoAnterior.imagen;
        }
        const producto = await Productos.findOneAndUpdate({ _id: idProducto }, req.body,
            {
                new: true,
                runValidators: true
            });
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        console.log(producto)
        res.json(producto);
    }
    catch (error) {
        res.status(500)
        res.json({
            mensaje: 'Ocurrió un error' + error
        })
    }
}
//Eliminar Producto
exports.eliminarProducto = async (req, res, next) => {
    try {
        const idProducto = req.params.idProducto;

        // Buscar el producto para obtener su imagen
        const producto = await Productos.findById(idProducto);

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        // Verificar si el producto tiene una imagen y eliminarla
        if (producto.imagen) {
            const rutaImagen = path.join(__dirname, '../uploads/', producto.imagen);
console.log("Ruta Imagen:  ",rutaImagen)
            // Verificar si el archivo existe antes de eliminarlo
            fs.unlink(rutaImagen, (error) => {
                if (error) {
                    console.log(`Error eliminando la imagen: ${error}`);
                    // Si es importante reportar el error, puedes enviar una respuesta con el error o continuar
                } else {
                    console.log('Imagen eliminada correctamente');
                }
            });
        }

        // Eliminar el producto de la base de datos
        await Productos.findOneAndDelete({ _id: idProducto });

        res.json({
            mensaje: 'Producto y su imagen eliminados con éxito'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Ocurrió un error: ' + error
        });
    }
}
