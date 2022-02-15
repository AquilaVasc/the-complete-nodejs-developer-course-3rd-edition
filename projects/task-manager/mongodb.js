// CRUD create read update delete

const mongodb = require('mongodb');

const { MongoClient, ObjectId } = mongodb;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect correctly");
    } 

    const db = client.db(databaseName);

    db.collection('users').deleteMany({
        age: 25
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

    db.collection('tasks').deleteOne({
        description: 'Finishe the Hero Digital Assignment'
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});