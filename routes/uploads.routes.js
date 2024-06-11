const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarArchivoSubir } = require('../middlewares/index.middlewares')
const { cargarArchivos, mostrarImagen, actualizarImagenCloudinary, getListObjects, getObject, downloadFile, getUrlFile } = require('../controllers/uploads.controllers')
// const { validarJWT } = require('../middlewares/validar_jwt.middlewares')
// const { coleccionesPermitidas, existeID } = require('../helpers/db_validators.helpers')


const router = Router()

router.get('/', [    
    
], getListObjects)

router.get('/:filename', [    
    check('filename', 'Debe de contener un Filename para hacer la busqueda especializada').notEmpty(),
    validarCampos
], getObject)

router.get('/downloadfile/:filename', [    
    check('filename', 'Debe de contener un Filename para hacer la busqueda especializada').notEmpty(),
    validarCampos
], downloadFile)

router.get('/geturlfile/:filename', [    
    check('filename', 'Debe de contener un Filename para hacer la busqueda especializada').notEmpty(),
    validarCampos
], getUrlFile)




router.post('/', [    
    validarArchivoSubir,
    validarCampos
], cargarArchivos)



module.exports = router