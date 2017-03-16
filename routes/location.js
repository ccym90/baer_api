///recieves information from browser and passes the information to get unpacked and handled further

var express = require('express');
var router = express.Router();
var user = require('../models/user');
var Location = require('../models/locationdata');

router.post('/', function(req, res, next){


	var location1 = new Location
    	location1.coordinate.lat = req.body.latitude;
    	location1.coordinate.lng = req.body.longitude;
    	location1.save(function(err, location1){
      		if(err){
        		console.log(err);
      		}
        	console.log(location1);
        	res.json(location1);
    	});

})

module.exports = router;