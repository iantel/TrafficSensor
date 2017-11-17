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
    if (req.query.count == "up") {

	    Room.find({ 'name': req.query.name }, function(err, result) {
	  
	   //  if (!result) {
	   //  	res.sendStatus(418)
	   //  }
  		// else 
	  		if(result[0] != null) {
	  			result[0].current_occupancy = result[0].current_occupancy + 1;
	  			result[0].save();
	  			res.sendStatus(200);
		  	} else {
		  		res.sendStatus(418)
		  	}

	    });
	} else if (req.query.count == "down") {

	    Room.find({ 'name': req.query.name }, function(err, result) {
	  		// if (!result) {
	  		// 	res.sendStatus(418)
	  		// }
	  		// else 
	  			if(result[0] != null) {
	  				if (result[0].current_occupancy != 0) {
	  					result[0].current_occupancy = result[0].current_occupancy - 1;
	  					result[0].save();
	  				}
	  			res.sendStatus(200);

		  	} else {
		  		res.sendStatus(418)
		  	}

	    });
	} else {
		res.sendStatus(418)
	}
});


module.exports.router = router;
