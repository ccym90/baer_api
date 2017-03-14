var localStrategy = require('passport-local').Strategy;
var User = require( '../models/user');
var validator = require('validator');

module.exports = function(passport){

	// Serialize functions
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
    console.log("serialised user");
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
      console.log("deserialised user");
	  });
	});

	// Passport email / password login
	passport.use('local-login', new localStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback: true
    },
    function(req, email, password, done){
        console.log("localStrategy:", email);

        process.nextTick(function(){ //important to make asychronous if have busy site 

          // Validation
          if(!validator.isEmail(email) && !(password.length > 6)){
              return done(null,false);
          }

          User.findOne( {'email' : email }, function(err, user){
            console.log('ARE YOU GETTING AN EMAIL??');
            if(err){
              console.log("localStrategy: There was an error in the database call", err);
              return done(err);
            }

            if(!user){ // We did not find a user in the DB
              console.log("localStrategy: Create user");
              //return done(null, false, req.flash('loginMessage', 'No user found!')); 

               // Create user

              var user = new User();
              user.email = email;
              user.password = password;
              user.save(function(err, user){
                var isCreatedUser = true;
                return done(null,user);
                console.log('MADE NEW USER!!');
              });
            } else { // We did  find a user in the DB

              if(!user.validPassword(password, function(err, isMatch){
                console.log("localStrategy: Check users password");
                return done(null, false, req.flash('loginMessage', 'Opps! Wrong Password'));

                if(isMatch){
                   console.log("localStrategy: password is correct");
                   return done(null, user);
                }else{
                   console.log("localStrategy: password is wrong");
                   return done(null,false);
                }
              }));
            }
    	  });
  		});
  	}));
}