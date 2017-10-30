var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

/*
  This file needs to handle the insertion of new room documents and
  retrieving the necessary room documents from Mlab
*/

router.get('/',function(req, res){
  // temporary test code
  res.send('Get all rooms.');
  MongoClient.connect('mongodb://csc301:12345678@ds141185.mlab.com:41185/base', (err, database) => {
  	if (err) return console.log(err)
    db = database
    var collection = db.collection('rooms').find().toArray(function(err, results) {
      console.log(results)
    })
  })
});

router.post('/', function(req, res) {
  // Create user
  res.send('some rooms.');
});

module.exports.router = router;
