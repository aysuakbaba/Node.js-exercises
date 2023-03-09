const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

//Give us access the functions neccessary connect to the database so we can perform our operations
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const client = new MongoClient(connectionURL)

console.log('Aysu');


// MongoClient.connect(connectionURL, {useUnifiedTopology: true} , (error, client) => {
//     if(error){
//         return console.log('Unable to connect to database');
//     }
//     const db = client.db(databaseName)
//     db.collection('users').insertOne({
//         name: 'your name',
//         age: 24
//     })

// })