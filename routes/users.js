module.exports = function(app, passport){


	// Login
	app.post('/', passport.authenticate('local-login', {
		successRedirect : '/homepage',
		failureRedirect : '/error',
	}));

	// // logout
	//   app.get('/logout', function(req, res){
	//     req.logout();
	//     res.redirect('/');
	//   });

	// Secret
	app.get('/homepage', function(req, res){
		res.render('homepage', {});
	});

		// Secret
	app.get('/error', function(req, res){
		res.send("404");
	});

	/**
	 *	Facebook
	 */
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'})); //change scope: email to find the email from the FB json file, makes it accessible for me
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/homepage',
		failureRedirect: '/error'
	}));
	
	/**
	 *	Google+
	 */
	app.get('/auth/google', passport.authenticate('google', {scope: 'email'})); 
	app.get('/auth/google/callback', passport.authenticate('google', {
		successRedirect:'/homepage',
		failureRedirect:'/error'
	}));

	/**
	 *	Instagram
	 */
	app.get('/auth/instagram', passport.authenticate('instagram', { scope: 'basic'})); 
	app.get('/auth/instagram/callback', passport.authenticate('instagram', {
		successRedirect:'/homepage',
		failureRedirect:'/error'
	}));

} 

