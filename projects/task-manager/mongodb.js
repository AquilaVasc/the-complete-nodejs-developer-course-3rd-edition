// CRUD create read update delete

const mongodb = require('mongodb');

const { MongoClient, ObjectId } = mongodb;

const id = new ObjectId();
console.log(id.id.length);
console.log(id.toHexString().length);

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect correctly");
    } 

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'Fernanda',
    //     age: 21
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user');
    //     }

    //     console.log(result);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, 
    //     {
    //         name: 'Augusto',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert documents');
    //     }

    //     console.log(result);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: "Study JUnit",
    //         completed: false
    //     },
    //     {
    //         description: "Finishe the Hero Digital Assignment",
    //         completed: false
    //     },
    //     {
    //         description: "Have dinner",
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert tasks');
    //     }

    //     console.log(result);
    // })
});