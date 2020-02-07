
const express = require('express')
const app = express()
// load bodyParser module for json payload parsing
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/coursework2";
var dbo;
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("coursework2");
    
    console.log("Database created!");
  });

//setting headers for permissions
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT,OPTIONS,DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization,Accept-Language');
next();
});

// get the collection name
// app.param('collectionName', (req, res, next, collectionName) => {
// req.collection = db.collection(collectionName)
//  console.log('collection name:', req.collection)
// return next()
// })

// delete a lesson by ID
app.delete('/collections/:collectionName/:id', (req, res, next) => {
    dbo.collection(req.params.collectionName).deleteOne({ _id: ObjectId(req.params.id) }, (e, result) => {
    if (e) return next(e)
    res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
    })
})

// update a lesson by ID
app.put('/collections/:collectionName/:id', (req, res, next) => {
    var newvalues = { $set: { topic: req.body.topic, location: req.body.location,
        price: req.body.price, rating: req.body.rating} };
    dbo.collection(req.params.collectionName).updateOne({ _id: ObjectId(req.params.id) },
    newvalues,
    { safe: true, multi: false }, (e, result) => {
    if (e) return next(e)
    res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
    })
})

// retrieve a lesson by mongodb ID 
app.get('/collections/:collectionName/:id', (req, res, next) => {
    console.log('searching json object winodth id:', req.params.id)
    dbo.collection(req.params.collectionName).findOne({ _id: ObjectId(req.params.id) }, (e, result) => {
    if (e) return next(e)
    res.send(result)
    })
    next();
})

// add a lesson
app.post('/collections/:collectionName', (req, res, next) => {
    var collectionName = req.params.collectionName
    var myobj = { topic: req.body.topic, location: req.body.location,
                  price: req.body.price, rating: req.body.rating};
      dbo.collection(collectionName).insertOne(myobj, function(err, result) {
        if (err) throw err;
        res.json(result)
    });
})

// example
app.post('/addcourses/:collectionName', (req, res, next) => {
    var collectionName = req.params.collectionName

    
    MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  var myobj = [
{ 'topic': 'math', 'location': 'colindale', 'price': 80,'rating': 43, 'Provider': 'john', 'Providerreview': 4 },
{ 'topic': 'math', 'location': 'brent cross', 'price': 90, 'rating': 52, 'Provider': 'john', 'Providerreview': 4 },
{ 'topic': 'math', 'location': 'golders green', 'price': 120, 'rating': 43, 'Provider': 'john', 'Providerreview': 4 },
{ 'topic': 'english', 'location': 'hendon', 'price': 110, 'rating': 42, 'Provider': 'john', 'Providerreview': 4 },
{ 'topic': 'english', 'location': 'colindale', 'price': 90, 'rating': 42, 'Provider': 'john', 'Providerreview': 4 },
{ 'topic': 'english', 'location': 'brent cross', 'price': 90, 'rating': 11, 'Provider': 'john', 'Providerreview': 4  },
{ 'topic': 'english', 'location': 'golders green', 'price': 130, 'rating': 35, 'Provider': 'john', 'Providerreview': 4 },
{ 'topic': 'piano', 'location': 'hendon', 'price': 120, 'rating': 55, 'Provider': 'john', 'Providerreview': 4  },
{ 'topic': 'piano', 'location': 'golders green', 'price': 140,'rating': 34, 'Provider': 'john', 'Providerreview': 4  },
{ 'topic': 'music', 'location': 'hendon', 'price': 10, 'rating': 43, 'Provider': 'john', 'Providerreview': 4 },
{ 'topic': 'Music', 'location': 'colindale', 'price': 87,'rating': 43, 'Provider': 'steve', 'Providerreview': 5 },
{ 'topic': 'music', 'location': 'brent cross', 'price': 93, 'rating': 54, 'Provider': 'steve', 'Providerreview': 5 },
{ 'topic': 'music', 'location': 'golders green', 'price': 133, 'rating': 76, 'Provider': 'steve', 'Providerreview': 5 },
{ 'topic': 'it', 'location': 'hendon', 'price': 113, 'rating': 76, 'Provider': 'steve', 'Providerreview': 5 },
{ 'topic': 'it', 'location': 'colindale', 'price': 93, 'rating': 88, 'Provider': 'steve', 'Providerreview': 5 },
{ 'topic': 'it', 'location': 'brent cross', 'price': 92, 'rating': 87, 'Provider': 'steve', 'Providerreview': 5  },
{ 'topic': 'it', 'location': 'golders green', 'price': 154, 'rating': 98, 'Provider': 'steve', 'Providerreview': 5 },
{ 'topic': 'art', 'location': 'hendon', 'price': 154, 'rating': 76, 'Provider': 'steve', 'Providerreview': 5  }
  ];
        
  dbo.collection("courses").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});

    
    
    
    
    
    
    
    
    
    
    
    
    
    
})




//for the ratings
app.post('/review/:collectionName', (req, res, next) => {
    var collectionName = req.params.collectionName
    var myobj = { topic: req.body.topic, location: req.body.location,
                rating: req.body.rating};
      dbo.collection(collectionName).insertOne(myobj, function(err, result) {
        if (err) throw err;
        res.json(result)
    });
})


app.get('/review/:collectionName', (req, res,next) => {
    var collectionName = req.params.collectionName
    dbo.collection(collectionName).find({}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result)
    });
})


app.put('/review/:collectionName/:id', (req, res, next) => {
    var newval = { $set: { topic: req.body.topic, location: req.body.location,
        price: req.body.price, rating: req.body.rating} };
    dbo.collection(req.params.collectionName).updateOne({ _id: ObjectId(req.params.id) },
    newval,
    { safe: true, multi: false }, (e, result) => {
    if (e) return next(e)
    res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
    })
})

app.put('/collections/:collectionName/:id', (req, res, next) => {
    var newval = { $set: { topic: req.body.topic, location: req.body.location,
        price: req.body.price, rating: req.body.rating} };
    dbo.collection(req.params.collectionName).updateOne({ _id: ObjectId(req.params.id) },
    newval,
    { safe: true, multi: false }, (e, result) => {
    if (e) return next(e)
    res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
    })
})





//POST for USER data
app.post('/users/:collectionName', (req, res, next) => {
    var collectionName = req.params.collectionName
    var myobj = { topic: req.body.topic, location: req.body.location, type: req.body.type
              };
      dbo.collection(collectionName).insertOne(myobj, function(err, result) {
        if (err) throw err;
        
        res.json(result)
         next();
    });
    
})


// colection GET for users reg
app.get('/users/:collectionName', (req, res,next) => {
    var collectionName = req.params.collectionName
    dbo.collection(collectionName).find({}).sort({_id:-1}).limit(1).toArray(function(err, result) {
    if (err) throw err;
    res.json(result)
    });
})

//login
app.get('/login/:collectionName', (req, res,next) => {
    var collectionName = req.params.collectionName
    dbo.collection(collectionName).find({}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result)
    });
})




// retrieve all the objects from an collection
app.get('/collections/:collectionName', (req, res,next) => {
    var collectionName = req.params.collectionName
    dbo.collection(collectionName).find({}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result)});
    
})


//http://localhost:3000/john/courses test  // retrieve all the objects from an collection for john

app.get('/john/:collectionName', (req, res,next) => {
    var collectionName = req.params.collectionName
    dbo.collection(collectionName).find({Provider: "john"}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result)
    });
})

//retrieve all the objects from an collection for steve
app.get('/steve/:collectionName', (req, res,next) => {
    var collectionName = req.params.collectionName
    dbo.collection(collectionName).find({Provider: "steve"}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result)
    });
})

//initail start up 

app.post('/createCollection',function(req,res) {
    dbo.createCollection(req.body.collection, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
      });
})

// dispaly a message for root path to show that API is working
app.get('/', function (req, res) {
res.send('Select a collection, e.g., /collections/messages')
})

app.listen(3000); 