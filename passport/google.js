var googleStrategy = require( 'passport-google-oauth2' ).Strategy;
 

var appid ='1083872056995-duc0r1tdcee8okcr5gcgcn1o68ivl1md.apps.googleusercontent.com';
var appSecret= 'WDxQSDAGJ8YWN-JIMID4hDgB';
var callback= "http://localhost:3000/auth/google/callback"

//     passReqToCallback   : true
//    },
//    function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

var User = require('../models/user')  //check obtaining the correct thing

module.exports = function (passport) {

  passport.use("google", new googleStrategy({
      clientID: appid,
      clientSecret: appSecret,
      callbackURL: callback,
      profileFields: ['id', 'emails', 'name', 'photos', 'link', 'gender']   //these are the feilds we want to take from the API (check regularly as FB changes settings)

  },
  function(request, accessToken, refreshToken, profile, done) {  //creating the new user to store in MongoDB

    

    process.nextTick(function(){ //important to make asychronous if have busy site 

      var email = profile.emails[0].value;
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
              user.google.id = profile.id;
              user.google.profile = profile;
              user.save(function(err, user){
                  return done(null,user);
                });

            }else{
              console.log("googleStrategy: User unknown - Create new user");

              // Create user
              var user = new User();
              user.email = email;
              user.password = "";
              user.google.accessToken = accessToken;
              user.google.refreshToken = refreshToken;
              user.google.id = profile.id;
              user.google.profile = profile;
                user.save(function(err, user){
                  return done(null,user);
                });
            }
          });
        });
  }));
}