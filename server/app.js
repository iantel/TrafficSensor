var express = require('express');
var app = express();
var db;

app.get('/', function (req, res) {
	res.send('Hello World!');

});

const MongoClient = require('mongodb').MongoClient;

// Dont start server unless connection with mongodb server is available
MongoClient.connect('mongodb://csc301:12345678@ds141185.mlab.com:41185/base', (err, database) => {
	if (err) return console.log(err)
  db = database

  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

// Route for get/Post requests for "rooms".
app.use('/rooms', require('./controllers/rooms').router);
