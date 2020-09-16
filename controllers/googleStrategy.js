const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv').config()
const passport = require("passport");
const { User } = require('../models/user')



//to determine which data of the user object should be stored in the session.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
      done(null, user);
  });
});



passport.use(new GoogleStrategy({
  //options for strategy
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/auth/google/redirect"
},
  //callback function
  (accessToken, refreshToken, profile, done) => {
    try {



      // Find a user if exist or not
      User.findOne({ 'google.googleId': profile.id })
        .then(user => {
          if (user) {
            console.log('Sorry user is actually exist!')
            done(null, user);
          } else {


            // Create a new User
            const newUser = new User({
              method: 'google',
              username: profile.displayName,
              email: profile.emails[0].value,
              google: {
                googleId: profile.id,
              }
            })

            console.log(newUser)
            // Save a Created User
            newUser.save();
            done(null, newUser);
          }

        })





    } catch (err) {
      console.log(err)
    }
  }
));


