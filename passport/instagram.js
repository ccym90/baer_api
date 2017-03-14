var instagramStrategy = require('passport-instagram').Strategy;


var appid = '8394105772fd4ba18d27fcd78fd228df';
var appSecret= 'c947dc843b394ce081d2d76139f5fafb';
var callback= "http://localhost:3000/auth/instagram/callback"


var User = require('../models/user') 	//check obtaining the correct thing

module.exports = function (passport) {

	passport.use("instagram", new instagramStrategy({
	    clientID: appid,
	    clientSecret: appSecret,
	    callbackURL: callback,
	    profileFields: ['basic']
},
	function(accessToken, refreshToken, profile, done) {	//creating the new user to store in MongoDB

		process.nextTick(function(){ //important to make asychronous if have busy site 
      console.log(profile);
		  var username = profile.username;
		  console.log("instagramStrategy:", username);
      console.log("are you gettting to here!!!!!!!!!!!!!!!!!!!!!!!!!!");

          User.findOne( {'username' : username }, function(err, user){

          	if(err){
              console.log("instagramStrategy: There was an error in the database call", err);
              return done(err);
            }

            if(user){
            	console.log("instagramStrategy: Local user found - merging data");
            	user.instagram.accessToken = accessToken;
            	user.instagram.refreshToken = refreshToken;
            	user.instagram.id = profile.id;
            	user.instagram.profile = profile;
            	user.save(function(err, user){
                	return done(null, user);
              	});

            }else{
            	console.log("instagramStrategy: User unknown - Create new user");
              console.log(err);
            	// Create user
              var user = new User();
              user.username = username;
              user.password = "";
              user.email = "notfound@instagram.com";
              user.instagram.accessToken = accessToken;
            	user.instagram.refreshToken = refreshToken;
            	user.instagram.id = profile.id;
            	user.instagram.profile = profile;
              	user.save(function(err, user){
                  if(err){
                    console.log("instagramStrategy: error saving new user", err);
                    return done(err,false);
                  }

                	return done(null, user);
              	});
            }
          });
      	});
	}));
}