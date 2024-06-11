const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarArchivoSubir } = require('../middlewares/index.middlewares')
const { cargarArchivos, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controllers')
// const { validarJWT } = require('../middlewares/validar_jwt.middlewares')
// const { coleccionesPermitidas, existeID } = require('../helpers/db_validators.helpers')


const router = Router()

router.post('/', [    
    validarArchivoSubir,
    validarCampos
], cargarArchivos)



module.exports = router