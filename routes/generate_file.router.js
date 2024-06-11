const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/index.middlewares')
const { generatePDF } = require('../controllers/generate_file.controllers')



const router = Router()

router.post('/', [    
    // validarArchivoSubir,
    // validarCampos
], generatePDF)



module.exports = router