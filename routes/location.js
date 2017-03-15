var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017/baer');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


$(document).on('click','#checkout', function(e){
        e.preventDefault();
        var target = e.target;
        
        var coordinates = {latitude, longitude};
        $.ajax({
            url: "/homepage",
            method: "POST",
            // success: function(data)
            // console.log('success', data);
            data: coordinates,
        })
        .fail(function() {
            console.log("error");
        })
        .done(function( data ) {
                console.log( "coordinates saved" );
        });
        console.log('Inputs', coordinates);
    });

   /*
    *   AJAX WRAPPER
    */

    function getCoor(url, method, data, cb){

        var returnedData = {}
        var error = undefined;

        $.ajax({
            url: url,
            data: data,
            type: method, 
            dataType: "json"
        })

        .done(function(xhr, status, err){
            console.log("Error");
            console.log(err);
            console.log("Status", status);
            console.log("xhr", xhr);
            error = err;

        })
        .always(function(xhe, status){
            cb(error, returnedData);
        });
    }

    function getCoor(){

    };