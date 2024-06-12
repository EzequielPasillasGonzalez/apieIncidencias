const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { S3Client }  = require('@aws-sdk/client-s3');
const { SESClient } = require('@aws-sdk/client-ses');

const client = new S3Client({
    region: process.env.AWS_REGION,    
    credentials: {
        accessKeyId: process.env.AWS_USER_PUBLIC_ACCESS_KEY,
        secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY
    }
})

const  SMTPClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_USER_SMTP_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_USER_SMTP_SECRET_KEY
    }
});

const clientDynamoDB = new DynamoDBClient({
    region: process.env.AWS_REGION,  
    credentials: {
        accessKeyId: process.env.AWS_USER_PUBLIC_ACCESS_KEY_LAMBDA,
        secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY_LAMBDA,
    },
});

module.exports = {
    client,
    SMTPClient,
    clientDynamoDB
}