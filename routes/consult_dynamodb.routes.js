const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarArchivoSubir } = require('../middlewares/index.middlewares')

const { postItem, getItem, postIncidencia, getIncidencia } = require('../controllers/dynamodb_consult.controllers')


const router = Router()

router.post('/maestro', [
    check('codigo', 'Es necesario un codigo para poder crear un nuevo registro').notEmpty(),        
    check('nombre', 'Es necesario un nombre para poder crear un nuevo registro').notEmpty(),    
    check('crn', 'Es necesario un crn para poder crear un nuevo registro').notEmpty(),    
    check('clave', 'Es necesario una clave para poder crear un nuevo registro').notEmpty(),    
    // check('materia', 'Es necesario un materia para poder crear un nuevo registro').notEmpty(),    
    validarCampos
], postItem)

router.get('/maestro', [
    check('codigo', 'Es necesario un codigo para poder crear un nuevo registro').notEmpty(),            
    validarCampos
], getItem)


router.post('/incidencia', [
    check('codigo', 'Es necesario un codigo para poder crear un nuevo registro').notEmpty(),        
    check('nombre', 'Es necesario un nombre para poder crear un nuevo registro').notEmpty(),    
    check('url', 'Es necesario una url para poder crear un nuevo registro').notEmpty(),    
    validarCampos
], postIncidencia)

router.get('/incidencia', [
    check('codigo', 'Es necesario un codigo para poder crear un nuevo registro').notEmpty(),            
    validarCampos
], getIncidencia)





module.exports = router