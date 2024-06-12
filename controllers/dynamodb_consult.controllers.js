// Función para insertar un ítem en DynamoDB
const putItem = async (tableName, item) => {
    const params = {
        TableName: tableName,
        Item: item,
    };

    try {
        const command = new PutItemCommand(params);
        const response = await client.send(command);
        console.log('Item inserted successfully:', response);
    } catch (error) {
        console.error('Error inserting item:', error);
    }
};

// Función para obtener un ítem de DynamoDB
const getItem = async (tableName, key) => {
    const params = {
        TableName: tableName,
        Key: key,
    };

    try {
        const command = new GetItemCommand(params);
        const response = await client.send(command);
        console.log('Item retrieved successfully:', response.Item);
    } catch (error) {
        console.error('Error retrieving item:', error);
    }
};


module.exports = {    
    putItem,
    getItem
}