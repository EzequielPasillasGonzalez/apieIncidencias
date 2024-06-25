const fs = require('fs')
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { client } = require("../config_aws");
const { Upload } = require('@aws-sdk/lib-storage');


const uploadFileS3 = async (file, name) => {
    try {


        //? Leer archivo
        const stream = fs.createReadStream(file)
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: name,
            Body: stream
        }

        const command = new PutObjectCommand(uploadParams)

        return await client.send(command)
    } catch (error) {
        return error.message
    }
}

const uploadXLSS3 = async (file, name) => {
    try {


        //? Leer archivo
        const stream = await fs.createReadStream(file)
        const uploadParams = {
            client,
            params: {
                Bucket: process.env.AWS_BUCKET_NAME_XLS,
                Key: name,
                Body: stream
            }

        }

        const command = new Upload(uploadParams)

        const resp = await command.done();

        return resp.Key
    } catch (error) {
        return error.message
    }
}

const getFileURL = async (filename) => {


    try {
        const requestParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
        }

        const command = new GetObjectCommand(requestParams);

        // Expira en 7 dias
        return await getSignedUrl(client, command, { expiresIn: 604800 })

    } catch (error) {
        return error.message
    }
}

const getXLSURL = async (filename) => {


    try {        
        const requestParams = {
            Bucket: process.env.AWS_BUCKET_NAME_XLS,
            Key: filename,
        }

        const command = new GetObjectCommand(requestParams);

        return  await getSignedUrl(client, command, { expiresIn: 604800 })
    } catch (error) {
        return error.message
    }
}

module.exports = {
    uploadFileS3,
    getFileURL,
    uploadXLSS3,
    getXLSURL
}

