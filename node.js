

const express = require('express')
const app = express()
// load bodyParser module for json payload parsing
const bodyParser = require('body-parser')
app.use(bodyParser.json())
// connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
db = client.db('afterschool')
})

// dispaly a message for root path to show that API is working
app.get('/', function (req, res) {
res.send('Select a collection, e.g., /collections/messages')
})




    app.get('/collections/:collectionName', (req, res) => {
        req.collection.find({}, { limit: 5, sort: [['price', -1]] }).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
        })
        })



       // retrieve all the objects from an collection

.listen(3000);