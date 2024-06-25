const path = require('path')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const XlsxPopulate = require('xlsx-populate');


const { buildPDF } = require("../lib/pdfkit");
const { cargarArchivosDesdePath, cargarXLSXDesdePath } = require('./uploads.controllers');
const { downloadXlsFile } = require('../helpers/downloadXLS.helpers');

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

// export const handler = async (event) => {
//     // TODO implement
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
//   };

// 



const generatePDF = async (req, res = response) => {
    try {
        const { nombre, codigo, plaza, fechaPermiso, idMotivo, FraClausula } = req.body

        const usuario = {
            nombre,
            codigo,
            plaza,
            fechaPermiso,
            idMotivo,
            FraClausula
        }

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

const generateXLSX = async (req, res = response) => {

    try {
        const { nombre, codigo, plaza, fechaPermiso, idMotivo, FraClausula, pdf } = req.body

        const usuario = {
            nombre,
            codigo,
            plaza,
            fechaPermiso,
            idMotivo,
            FraClausula,
            pdf
        }

        // Load a new blank workbook
        const workbook = await XlsxPopulate.fromBlankAsync()

        // Modify the workbook.
        workbook.sheet(0).cell("A1").value('Nombre');
        workbook.sheet(0).cell("B1").value('Codigo');
        workbook.sheet(0).cell("C1").value('Plaza');
        workbook.sheet(0).cell("D1").value('Fecha de permiso');
        workbook.sheet(0).cell("E1").value('ID del motivo');
        workbook.sheet(0).cell("F1").value('Otro motivo');
        workbook.sheet(0).cell("G1").value('PDF');

        workbook.sheet(0).cell("A2").value(usuario.nombre);
        workbook.sheet(0).cell("B2").value(usuario.codigo);
        workbook.sheet(0).cell("C2").value(usuario.plaza);
        workbook.sheet(0).cell("D2").value(usuario.fechaPermiso);
        workbook.sheet(0).cell("E2").value(usuario.idMotivo);

        if (usuario.FraClausula) {
            workbook.sheet(0).cell("F2").value(usuario.FraClausula);
        } else {
            workbook.sheet(0).cell("F2").value(false);
        }

        if (usuario.pdf) {
            workbook.sheet(0).cell("G2").value(usuario.pdf);
        } else {
            workbook.sheet(0).cell("G2").value(false);
        }

        // Se guarda el arhivo en la carpeta temporal
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Genera un nombre de archivo único
        const nombreTemp = uuidv4() + '.xlsx'
        // const nombreTemp = 'incidencias.xlsx'

        // Guarda la referencia del archivo en la carpeta temp
        const filePath = path.join(tempDir, nombreTemp);


        await workbook.toFileAsync(filePath);

        //Sube el archivo a S3
        const resp = await cargarXLSXDesdePath(filePath, nombreTemp);

        res.json({
            ok: true,
            body: resp
        });

    } catch (error) {
        res.json({
            ok: false,
            body: `${error.message}`
        });
    }
};


const putXLSX = async (req, res = response) => {

    try {
        const { nombre, codigo, plaza, fechaPermiso, idMotivo, FraClausula, pdf } = req.body

        const nombreArchivo = 'incidencias.xlsx'

        const usuario = {
            nombre,
            codigo,
            plaza,
            fechaPermiso,
            idMotivo,
            FraClausula,
            pdf
        }
        
        // Se guarda el arhivo en la carpeta temporal
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
        // Genera un nombre de archivo único
        const filePath = await downloadXlsFile(nombreArchivo, tempDir)        

        // Carga el archivo existente
        const workbook = await XlsxPopulate.fromFileAsync(filePath)        

        // Obtener la hoja de cálculo 
        const sheet = await workbook.sheet(0);

        // Encuentra la próxima fila vacía
        const nextRow = await sheet.usedRange().endCell().rowNumber() + 1;        

        await workbook.sheet(0).cell(`A${nextRow}`).value(usuario.nombre);
        await workbook.sheet(0).cell(`B${nextRow}`).value(usuario.codigo);
        await workbook.sheet(0).cell(`C${nextRow}`).value(usuario.plaza);
        await workbook.sheet(0).cell(`D${nextRow}`).value(usuario.fechaPermiso);
        await workbook.sheet(0).cell(`E${nextRow}`).value(usuario.idMotivo);

        if (usuario.FraClausula) {
            await workbook.sheet(0).cell(`F${nextRow}`).value(usuario.FraClausula);
        } else {
            await workbook.sheet(0).cell(`F${nextRow}`).value(false);
        }

        if (usuario.pdf) {
            await workbook.sheet(0).cell(`G${nextRow}`).value(usuario.pdf);
        } else {
            await workbook.sheet(0).cell(`G${nextRow}`).value(false);
        }                


        await workbook.toFileAsync(filePath);

        //Sube el archivo a S3
        const resp = await cargarXLSXDesdePath(filePath, nombreArchivo);

        res.json({
            ok: true,
            body: resp
        });

    } catch (error) {
        res.json({
            ok: false,
            body: `${error.message}`
        });
    }
};

module.exports = {
    generatePDF,
    generateXLSX,
    putXLSX
}