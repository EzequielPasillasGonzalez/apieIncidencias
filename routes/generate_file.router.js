const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/index.middlewares')
const { generatePDF } = require('../controllers/generate_file.controllers')



const router = Router()

router.post('/', [    
    check('nombre', 'Debe de contener un nombre para completar el proceso').notEmpty(),
    check('codigo', 'Debe de contener un codigo para completar el proceso').notEmpty(),
    check('plaza', 'Debe de contener un plaza para completar el proceso').notEmpty(),
    validarCampos
], generatePDF)



module.exports = router