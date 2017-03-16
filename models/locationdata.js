var mongoose = require('mongoose');


var userLocation = mongoose.Schema({

	coordinate	: {
		lat: String,
		lng: String,
	},

},{
	timestamps: true
});



var Location = mongoose.model('Location', userLocation);
module.exports = Location;