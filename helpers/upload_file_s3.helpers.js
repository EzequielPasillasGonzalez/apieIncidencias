const fs = require('fs')
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const { client } = require("../config_s3");


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

module.exports = {
    uploadFileS3
}

