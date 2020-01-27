const http = require('http')
const util = require('util')
const querystring = require('querystring')
const mongo = require('mongodb')
const host = process.env.MONGOHQ_URL ||
'mongodb://@127.0.0.1:27017'
// MONGOHQ_URL=mongodb://user:pass@server.mongohq.com/db_name
mongo.Db.connect(host, (error, client) => {
if (error) throw error;
let collection = new mongo.Collection(
client,
'test_collection'
);
// continues on the next slides ...
let app = http.createServer(
(request, response) => {
if (
request.method === 'GET' &&
request.url === '/messages/list.json'
) {
collection.find().toArray((error, results) => {
response.writeHead(
200,
{'Content-Type': 'text/plain'}
);
console.dir(results);
response.end(JSON.stringify(results));
});
};
if (request.method === "POST" &&
request.url === "/messages/create.json"
) {
request.on('data', (data) => {
collection.insert(
querystring.parse(data.toString('utf-8')),
{safe: true},
(error, obj) => {
if (error) throw error;
response.end(JSON.stringify(obj));
}
);
});
};
}
);
const port = process.env.PORT || 5000
app.listen(port)
})