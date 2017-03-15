///recieves information from browser and passes the information to get unpacked and handled further

var express = require('express');
var router = express.Router();



router.post('/homepage', function(req, res, next){

	var coordinates =req.body.coordinates;
	console.log(coordinates)

})

module.exports = router;