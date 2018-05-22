// create-db-table.js - Create table in DynanoDB

var params = {
    TableName : "dictionary",
    KeySchema: [
        { AttributeName: "mainWord", KeyType: "HASH"}  //Partition key
    ],
    AttributeDefinitions: [       
        { AttributeName: "mainWord", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
