var facebookStrategy = require('passport-facebook').Strategy;


var appid = '381054838941454';
var appSecret = '0ffe812b5cb7bb700cb7c348545edfd9';
var callback = "http://localhost:3000/auth/facebook/callback"

var User = require('../models/user') 	//check obtaining the correct thing

module.exports = function (passport) {

	passport.use("facebook", new facebookStrategy({
	    clientID: appid,
	    clientSecret: appSecret,
	    callbackURL: callback,
	    profileFields: ['id', 'emails', 'name', 'photos', 'link', 'gender'] 	//these are the feilds we want to take from the API (check regularly as FB changes settings)

	},
	function(accessToken, refreshToken, profile, done) {	//creating the new user to store in MongoDB

		

		process.nextTick(function(){ //important to make asychronous if have busy site 

		  var email = profile.emails[0].value;
		  console.log("facebookStrategy:", email);

          User.findOne( {'email' : email }, function(err, user){

          	if(err){
              console.log("facebookStrategy: There was an error in the database call", err);
              return done(err);
            }

            if(user){
            	console.log("facebookStrategy: Local user found - merging data");
            	user.facebook.accessToken = accessToken;
            	user.facebook.refreshToken = refreshToken;
            	user.facebook.id = profile.id;
            	user.facebook.profile = profile;
            	user.save(function(err, user){
                	return done(null,user);
              	});

            }else{
            	console.log("facebookStrategy: User unknown - Create new user");

            	// Create user
              	var user = new User();
              	user.email = email;
              	user.password = "";
              	user.facebook.accessToken = accessToken;
            	user.facebook.refreshToken = refreshToken;
            	user.facebook.id = profile.id;
            	user.facebook.profile = profile;
              	user.save(function(err, user){
                	return done(null,user);
              	});
            }
          });
      	});
	}));
}