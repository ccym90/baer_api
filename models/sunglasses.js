var mongoose = require('mongoose');

var sunglassesSchema = new mongoose.Schema({
	name        : {type: String, required: true},
	description : {type: String, required: true}, 
	price       : {type: Number, required: true}, 
	image       : {type: String, required: true}, 
})

var Sunglasses = mongoose.model('Sunglasses', sunglassesSchema); 
module.exports = Sunglasses;