var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('Hello World!');
});

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://csc301:12345678@ds141185.mlab.com:41185/base', (err, database) => {
	if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
