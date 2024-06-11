const path = require('path')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const { buildPDF } = require("../lib/pdfkit");
const { cargarArchivosDesdePath } = require('./uploads.controllers');

// const generatePDF = async (req, res = response) => {
//     try {              
        
//         const usuario = {
//             usuario: 'Ezequiel',
//             encargado: 'Raul'
//         }

//         buildPDF(
//             (data) => {},
//              async () => {
                

//                 res.json({
//                     ok: true,
//                     body: `Archivo generado y subido exitosamente`
//                 });
//             },
//             usuario
//         );

             

//     } catch (error) {
//         res.json({
//             ok: false,
//             body: `${error}`
//         })
//     }
// }

const generatePDF = async (req, res = response) => {
    try {
        const usuario = {
            usuario: 'Ezequiel',
            encargado: 'Raul'
        };

        // Se guarda el arhivo en la carpeta temporal
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }        

        const nombreTemp = uuidv4() + '.pdf'
        // Genera un nombre de archivo único
        const filePath = path.join(tempDir, nombreTemp);        

        // Genera el PDF y guárdalo en el archivo temporal
        await buildPDF(filePath, usuario);

        // Sube el archivo a S3
        await cargarArchivosDesdePath(filePath, nombreTemp);

        res.json({
            ok: true,
            body: nombreTemp
        });

    } catch (error) {
        res.json({
            ok: false,
            body: `${error.message}`
        });
    }
};

module.exports = {    
    generatePDF
}