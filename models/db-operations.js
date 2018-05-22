// db-operations.js - Databases operations - add, update, fetch, delete.

var docClient = dynamodb.DocumentClient();
var table = "dictionary";

var dbOperations = module.exports = {};

dbOperations.addWord() = function(word, dict) {
    var params = {
        TableName: table,
        Item: {
            "mainWord": word,
            "info": dict
        }
    };
    
    console.log("Adding a new word in dictionary...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add word. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added word:", JSON.stringify(data, null, 2));
        }
    });
}

dbOperations.updateWord() = function(word, dict) {
    var params = {
        TableName:table,
        Key: {
            "mainWord": word
        },
        UpdateExpression: "set info.altSpelling = :x, info.usageCntr = :y, info.usages = :z",
        ExpressionAttributeValues:{
            ":x": dict.altSpelling,
            ":y": dict.usageCntr,
            ":z": dict.usages
        },
        ReturnValues:"UPDATED_NEW"
    };
    
    console.log("Updating word '"+ word +"' in dictionary...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

dbOperations.deleteWord() = function(word, dict) {
    var params = {
        TableName: table,
        Key: {
            "mainWord": word
        }
    };
    
    console.log("Attempting to delete word '"+ word +"'...");
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete word. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

dbOperations.fetchWord() = function(word, dict) {
    var params = {
        TableName: table,
        Key: {
            "mainWord": word
        }
    };
    
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            dict = data;
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}
