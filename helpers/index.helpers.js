// const generarJWT = require("./generarJWT.helpers");
// const dbValidators = require("./db_validators.helpers");
// const google_verify = require("./google_verify.helpers");
const subir_archivo = require("./subir_archivo.helpers");
const sendEmail = require("../controllers/email.controller");
const downloadFile = require("./downloadXLS.helpers");


module.exports = { // Se exportan todos sus modulos
    // ...dbValidators,
    // ...generarJWT,
    // ...google_verify,
    ...subir_archivo,
    ...sendEmail,
    ...downloadFile
}