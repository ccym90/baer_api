/*********************************************  preparing the information to store into mongo******************************************/

var googleStrategy = require('passport-google-oauth2').Strategy;
 

var appid ='853707057469-q17q3q0kugo6drfb3bu246t6ttoao4ov.apps.googleusercontent.com';
var appSecret= 'B7iJVowjTTy84DGimMrYUEDH';
var callback= "http://localhost:3000/auth/google/callback"

var User = require('../models/user')  //check obtaining the correct thing

module.exports = function (passport) {

  passport.use("google", new googleStrategy({
      clientID: appid,
      clientSecret: appSecret,
      callbackURL: callback,
      profileFields: ['profile', 'email']

  },
  function(accessToken, refreshToken, profile, done) {  

    console.log(profile);

    process.nextTick(function(){ 

      var email = profile.email;
      console.log("googleStrategy:", email);

          User.findOne( {'email' : email }, function(err, user){

            if(err){
              console.log("googleStrategy: There was an error in the database call", err);
              return done(err);
            }

            if(user){
              console.log("googleStrategy: Local user found - merging data");
              user.google.accessToken = accessToken;
              user.google.refreshToken = refreshToken;
              user.google.profile = profile;
              user.save(function(err, user){

              	    if(err){
              			console.log("googleStrategy: error saving user", err);
              			return done(err,false);
              		}

                  	return done(null,user);
                });

            }else{
              console.log("googleStrategy: User unknown - Create new user");

              // Create user
              var user = new User();
              user.email = profile.emails[0].value;
              user.password = "";
              user.google.accessToken = accessToken;
              user.google.refreshToken = refreshToken;
              user.google.profile = profile;
              user.save(function(err, user){
              	if(err){
              		console.log("googleStrategy: error saving new user", err);
              		return done(err,false);
              	}


                  return done(null,user);
              });
            }
          });
        });
  }));
}