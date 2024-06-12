const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarArchivoSubir } = require('../middlewares/index.middlewares')
const { cargarArchivos, mostrarImagen, actualizarImagenCloudinary, getListObjects, getObject, downloadFile, getUrlFile } = require('../controllers/uploads.controllers')


const router = Router()

router.get('/', [    
    
], getListObjects)








module.exports = router