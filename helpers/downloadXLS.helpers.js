const https = require('https');
const path = require('path')
const fs = require('fs');

const { getXLSURL } = require("./upload_file_s3.helpers");

const downloadXlsFile = async (filename, tempDir) => {

    try {
        // Descargar el archivo xlsx        
        const url = await getXLSURL(filename)

        // Genera un nombre de archivo único
        const filePath = path.join(tempDir, filename);

        // Crea una promesa para esperar a que se complete la descarga
        await new Promise((resolve, reject) => {
            const fileStream = fs.createWriteStream(filePath);
            https.get(url, (response) => {
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve(filePath); // Resuelve la promesa cuando se completa la descarga
                });
            }).on('error', (error) => {
                reject(error); // Rechaza la promesa en caso de error
            });
        });

        return filePath;
    } catch (error) {
        return error.message
    }




}

module.exports = {
    downloadXlsFile
}