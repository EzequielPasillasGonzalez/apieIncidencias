const path = require('path')

const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { SMTPClient } = require("../config_aws");


const sendEmail = async (toAddress, subject, url) => {
    const params = {
        Source: process.env.AWS_EMAIL_ADDRESS, // El correo verificado en SES
        Destination: {
            ToAddresses: [process.env.AWS_EMAIL_ADDRESS], // Dirección de destino
        },
        Message: {
            Subject: {
                Data: subject,
            },
            Body: {
                // Text: {
                //     Data: `Has solicitado un ${subject}`
                // },
                Html: {
                    Data: `
                    <div style="border-radius: 25px 25px 25px 25px; border: 2px solid #4E9430;">
        <div style="font-family: Arial, sans-serif, 'Open Sans'" >
            <div >            
                <img src="https://imgbucketudg.s3.amazonaws.com/universidad-de-guadalajara-eps-vector-logo.png" 
                     width="100px" 
                     height="100px" 
                       
                     data-bit="iit" 
                     style="float: left; margin: 10px;">         
                <img src="https://imgbucketudg.s3.amazonaws.com/logo4.png" 
                     width="150px" 
                     height="100px" 
                      
                     data-bit="iit" 
                     style="float: right; margin: 5px;">                     
            </div>            
            <div style="color:#4E9430;">
                <h1 style="text-align:center"><span class="il">Aquí</span> puedes descargar tu solicitud </h1>
                <!-- <h3 style="text-align:center">
                    Has solicitado un <span class="il">código</span> de verificación, tu <span class="il">código</span> es:
                </h3> -->
                <h4 style="text-align:center">
                    ${url}
                </h4>                    
            </div>
        </div>
      </div>               
                    `,
                },
            },
        },
    };

    try {
        const command = new SendEmailCommand(params);
        const response = await SMTPClient.send(command);
        return response;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    sendEmail
};