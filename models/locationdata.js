var mongoose = require('mongoose');


var userLocation = mongoose.Schema({

	coordinate	: {
		lat: Number,
		lng: Number,
	},

},{
	timestamps: true
});



var Location = mongoose.model('Location', userLocation);
module.exports = Location;