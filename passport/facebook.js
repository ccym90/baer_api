/*********************************************  preparing the information to store into mongo******************************************/

var facebookStrategy = require('passport-facebook').Strategy; //using the right passport module


var appid = '381054838941454';                        //created with the fb developers pg
var appSecret = 'b1c1e01bd82b1c8ddaaa89da5ee75d4b';
var callback = "http://localhost:3000/auth/facebook/callback";

var User = require('../models/user');  //check obtaining the correct model to use

module.exports = function (passport) {              // what we are sending to mongo 
  passport.use("facebook", new facebookStrategy({
      clientID: appid,
      clientSecret: appSecret,
      callbackURL: callback,
      profileFields: ['id', 'emails', 'name', 'photos', 'link', 'gender']   // the feilds we want to take from the API (check regularly as FB changes settings)
  
  },
  
  function(accessToken, refreshToken, profile, done) {  //creating the new user to store in MongoDB

    process.nextTick(function(){ //important to make asychronous if have busy site 

      var email = profile.emails[0].value;      //obtianing correct object from the fb data list
      console.log("facebookStrategy:", email);

          User.findOne( {'email' : email }, function(err, user){

            if(err){
              console.log("facebookStrategy: There was an error in the database call", err); 
              return done(err);
            }

            if(user){       
              console.log("facebookStrategy: Local user found - merging data"); //create the same user again if email found
              user.facebook.accessToken = accessToken;
              user.facebook.refreshToken = refreshToken;
              user.facebook.id = profile.id;
              user.facebook.profile = profile;
              user.save(function(err, user){
                  return done(null,user);
                });

            }else{
              console.log("facebookStrategy: User unknown - Create new user"); //creates new user if not found 

              // Create user
              var user = new User();
              user.email = email;
              user.password = "";
              user.facebook.accessToken = accessToken;
              user.facebook.refreshToken = refreshToken;
              user.facebook.id = profile.id;
              user.facebook.profile = profile;
                user.save(function(err, user){
                  console.log('****************is this ERROR??', err);
                  console.log(user);
                  return done(null,user);
                });
            }
          });
        });
  }));
  

}