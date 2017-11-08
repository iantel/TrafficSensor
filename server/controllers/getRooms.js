var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
mongoose.connect('mongodb://csc301:12345678@ds141185.mlab.com:41185/base');

var Room = require('../models/room.js');


router.get('/',function(req, res){
  // return all the rooms
  Room.find(function(err, test) {
    res.send(test);
  });
});

router.post('/', function(req, res) {
  // return the rooms with name
  Room.find({ 'name': req.query.name }, function(err, result) {
    res.send(result);
  });
});

module.exports.router = router;
