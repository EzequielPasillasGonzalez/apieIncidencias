const { response } = require("express");
const fs = require('fs');

const { uploadFileS3 } = require("../helpers/upload_file_s3.helpers");

const cargarArchivos = async (req, res = response) => {
    

    try {        
        const { tempFilePath, name } = req.files.archivo        

        // Imagenes, txt, md
        //const pathArchivo = await subirArchivo(req.files, ['txt', 'md'], 'textos' )        
        // const pathArchivo = await subirArchivo(req.files, undefined, 'pdf' )
        const archivoCargadoS3 = await uploadFileS3(tempFilePath, name)

        res.json({
            ok: true,
            body: 
                archivoCargadoS3            
        })

    } catch(error) {
        
        res.status(400).json({
            ok: false,
            body: error
        })

    }

}

const cargarArchivosDesdePath = async (filePath, nombreArchivo) => {
    try {
        const archivoCargadoS3 = await uploadFileS3(filePath, nombreArchivo);
        fs.unlinkSync(filePath); // Elimina el archivo temporal después de subirlo
        return archivoCargadoS3;
    } catch (error) {
        fs.unlinkSync(filePath); // Asegúrate de eliminar el archivo temporal en caso de error también
        throw error;
    }
};

module.exports = {
    cargarArchivos,  
    cargarArchivosDesdePath  
}