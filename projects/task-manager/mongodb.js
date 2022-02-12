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

    // db.collection('users').findOne({ _id:  new ObjectId("6207f67189a09293b98e9b70")}, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch');
    //     }
        
    //     console.log(user)
    // });

    // db.collection('users').find({age: 25}).toArray((error, users) => {
    //     if(error) {
    //         return console.log('Unable to find users with that age')
    //     }
    //     console.log(users)
    // });

    // db.collection('users').find({age: 25}).count((error, count) => {
    //     if(error) {
    //         return console.log('Unable to find users with that age')
    //     }
    //     console.log(count)
    // });

    db.collection('tasks').findOne({_id: new ObjectId("620716b4bda0bf2867f32792")}, (error, task) => {
        if(error) {
            return console.log('Unable to find that task')
        }
        
        console.log(task)
    });

    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        if(error) {
            return console.log('Unable to find tasks that match those criterias')
        }

        console.log(tasks)
    });
});