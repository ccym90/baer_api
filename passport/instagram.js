passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ instagramId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

