///taking information from database and passes the information to get unpacked and handled on map

var express = require('express');
var router = express.Router();
var user = require('../models/user');
var Location = require('../models/locationdata');

router.get('/', function(req, res, next){

  Location.distinct(('coordinate'),
    function(error, place){
      if(error) {
        console.log(error);
        return;
      }

      console.log(place);
      res.json(place); //just the router listening sent to ajax
    });

});

module.exports = router;