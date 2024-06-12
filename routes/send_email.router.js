const { Router } = require('express')
const { check } = require('express-validator')

const { sendTestEmail } = require('../controllers/send_email.controllers')
const { validarCampos } = require('../middlewares/validar_campos.middlewares')



const router = Router()

router.post('/', [    
    check('toAddress', 'Es necesario un nombre para poder enviar el correo').notEmpty(),
    check('subject', 'Es necesario un subject para poder enviar el correo').notEmpty(),
    check('url', 'Es necesario una url para poder enviar el correo').notEmpty(),
    validarCampos
], sendTestEmail)


module.exports = router