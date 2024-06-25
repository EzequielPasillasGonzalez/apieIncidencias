const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/index.middlewares')
const { generatePDF, generateXLSX, putXLSX } = require('../controllers/generate_file.controllers')



const router = Router()

router.post('/pdf', [    
    check('nombre', 'Debe de contener un nombre para completar el proceso').notEmpty(),
    check('codigo', 'Debe de contener un codigo para completar el proceso').notEmpty(),
    check('plaza', 'Debe de contener un plaza para completar el proceso').notEmpty(),
    validarCampos
], generatePDF)

router.post('/xls', [    
    check('nombre', 'Debe de contener un nombre para completar el proceso').notEmpty(),
    check('codigo', 'Debe de contener un codigo para completar el proceso').notEmpty(),
    check('plaza', 'Debe de contener un plaza para completar el proceso').notEmpty(),
    validarCampos
], generateXLSX)

router.put('/xls', [    
    check('nombre', 'Debe de contener un nombre para completar el proceso').notEmpty(),
    check('codigo', 'Debe de contener un codigo para completar el proceso').notEmpty(),
    check('plaza', 'Debe de contener un plaza para completar el proceso').notEmpty(),
    validarCampos
], putXLSX)



module.exports = router