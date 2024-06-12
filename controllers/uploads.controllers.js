const { response } = require("express");
const fs = require('fs');

const { uploadFileS3, getFileURL } = require("../helpers/upload_file_s3.helpers");
const { ListObjectsCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { client } = require("../config_aws");

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

    } catch (error) {

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

const getListObjects = async (req, res = response) => {


    try {
        const command = new ListObjectsCommand({
            Bucket: process.env.AWS_BUCKET_NAME
        })

        const { Contents } = await client.send(command)

        res.json({
            ok: true,
            body: Contents
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            body: error
        })
    }
}

const getObject = async (req, res = response) => {

    try {
        
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.params.filename
        })

        const {resp} = await client.send(command)

        console.log(resp);

        res.json({
            ok: true,
            body: resp.$metadata
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            body: error
        })
    }
}

const downloadFile = async (req, res = response) => {

    try {
        
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.params.filename
        })

        const resp = await client.send(command)        


         // Configurar los encabezados de la respuesta
         res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=${req.params.filename}`,
        });

        // Enviar el cuerpo de la respuesta al cliente
        resp.Body.pipe(res);
    } catch (error) {
        res.status(400).json({
            ok: false,
            body: error
        })
    }
}

const getUrlFile = async (req, res = response) => {

    try {
        
        const resp = await getFileURL(req.params.filename)
        
        res.json({
            ok: true,
            body: resp
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            body: error
        })
    }
}


module.exports = {
    cargarArchivos,
    cargarArchivosDesdePath,
    getListObjects,
    getObject,
    downloadFile,
    getUrlFile
}