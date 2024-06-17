const { PutItemCommand, GetItemCommand, ScanCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");

const { clientDynamoDB } = require("../config_aws");



const countRecords = async () => {
    try {
        const params = {
            TableName: process.env.AWS_TABLE_NAME_INCIDENCIA,
        };

        const command = new ScanCommand(params);
        const response = await clientDynamoDB.send(command);

        return response.Items.length; // Devuelve la longitud de la lista de elementos devueltos por el escaneo
    } catch (error) {
        console.error('Error counting records:', error);
        throw error;
    }
};

// Función para insertar un ítem en DynamoDB
const postItem = async (req, res = response) => {




    try {

        const { codigo, nombre, crn, clave } = req.body        

        const item = {
            codigo: { N: codigo.toString() },
            nombre: { S: nombre },
            crn: { N: crn.toString() },
            clave: { S: clave }
        }

        const params = {
            TableName: process.env.AWS_TABLE_NAME,
            Item: item,
        };

        const command = new PutItemCommand(params);

        await clientDynamoDB.send(command)

        res.json({
            ok: true,
            body: `Se agrego un nuevo registro exitosamente`
        });
    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        });
    }
};

// Función para insertar un ítem en DynamoDB
const postIncidencia = async (req, res = response) => {
    
    try {

        const { codigo, nombre, url } = req.body

        let newId = await countRecords();   

        newId ++

        const item = {
            id: { N: newId.toString() },
            codigo: { N: codigo.toString() },
            nombre: { S: nombre },
            url: { S: url }
        }

        const params = {
            TableName: process.env.AWS_TABLE_NAME_INCIDENCIA,
            Item: item,
        };

        const command = new PutItemCommand(params);

        await clientDynamoDB.send(command)

        res.json({
            ok: true,
            body: `Se agrego un nuevo registro exitosamente`
        });
    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        });
    }
};

// Función para obtener un ítem de DynamoDB
const getItem = async (req, res = response) => {

    const { codigo } = req.body

    const params = {
        TableName: process.env.AWS_TABLE_NAME,
        Key: {
            codigo: { N: codigo.toString() }
        }
    };

    try {
        const command = new GetItemCommand(params);
        const { Item } = await clientDynamoDB.send(command);

        res.json({
            ok: true,
            body: { maestro: Item }
        });
    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        });
    }
};

const getIncidencia = async (req, res = response) => {

    const { codigo } = req.body 

    const params = {
        TableName: process.env.AWS_TABLE_NAME_INCIDENCIA,
        IndexName: 'codigo',
        KeyConditionExpression: 'codigo = :codigo',
        ExpressionAttributeValues: {
            ':codigo': { N: codigo.toString() }
        }
    };

    try {
        const command = new QueryCommand(params);
        const { Items } = await clientDynamoDB.send(command);        

        res.json({
            ok: true,
            body: { maestro: Items }
        });
    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        });
    }
};

// const findRecordByCode = async (tableName, code) => {
//     try {
//         const params = {
//             TableName: tableName,
//             KeyConditionExpression: 'codigo = :code',
//             ExpressionAttributeValues: {
//                 ':code': { N: code.toString() }
//             }
//         };

//         const command = new QueryCommand(params);
//         const response = await client.send(command);

//         return response.Items; // Devuelve la lista de elementos que coinciden con el código
//     } catch (error) {
//         console.error('Error searching records by code:', error);
//         throw error;
//     }
// };



module.exports = {
    postItem,
    getItem,
    postIncidencia,
    getIncidencia
}