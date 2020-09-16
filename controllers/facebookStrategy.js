const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv').config()
const passport = require("passport");
const { User } = require('../models/user')


/****** Passport functions ******/
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
  });

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret:  process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email' ,'name']
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(accessToken)
      console.log(profile)
      /*
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
 
  */

}));