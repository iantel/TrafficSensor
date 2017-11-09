var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
mongoose.connect('mongodb://csc301:12345678@ds141185.mlab.com:41185/base');

var Room = require('../models/room.js');
/*
  This file needs to handle the insertion of new room documents and
  retrieving the necessary room documents from Mlab
*/

router.get('/',function(req, res){
  Room.find(function(err, test) {
    res.send(test[0].popular_hours);
  });
});

router.post('/', function(req, res) {
  // Create user
  res.send('some rooms.');
});

module.exports.router = router;
