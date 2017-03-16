//person that goes into database and places the information


//route the express 
var express = require('express');
var router = express.Router();

//mongoose 

var mongoose = require('mongoose');

//user & location route 

var location = require('/routes/location');
var user = require('../models/user');
var map = require('/map.js')
//unpack and save corodinate 

module.exports = function(getCoor) {
	console.log("saving coord to database");
	coordinate = [latitude, longitude]
	var corodinate = (latLng);

corodinate.save(function(err){
	console.log("has not saved");

});

}