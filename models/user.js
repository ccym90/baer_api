var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
	name		: {type: String},
	email 		: {type: String, unique: true, required: true},
	password 	: {type: String},

	facebook: {
		accessToken: String,
		refreshToken: String,
		id: String,
		profile: mongoose.Schema.Types.Mixed
	// },

	// instagram: {
	// 	token: String,
	// 	tokenSecret: String,
	// 	id: String,
	// 	profile: mongoose.Schema.Types.Mixed
	// },
		
	// google: {
	//  	accessToken: String,
	//  	refreshToken: String,
	//  	id: String,
	//  	profile: mongoose.Schema.Types.Mixed
	// }
},{
	timestamps: true
});

// Methods
/***
 *	Pre-save hash password
 */ 
userSchema.pre('save', function(next){
	const user = this;

	if(!user.isModified('password')) { return next(); }

	bcrypt.genSalt(10, (err, salt) => {
		if(err){ return next(err);
		}

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if(err){ return next(err); }
			user.password = hash;
			next();
		});
	});
});

/**
 *	Compare password
 */
userSchema.methods.validPassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        cb(err, isMatch);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;