const { S3Client }  = require('@aws-sdk/client-s3')

const client = new S3Client({
    region: process.env.AWS_REGION,    
    credentials: {
        accessKeyId: process.env.AWS_USER_PUBLIC_ACCESS_KEY,
        secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY
    }
})

module.exports = {
    client
}