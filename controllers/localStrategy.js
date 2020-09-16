const express = require('express');
const bcrypt = require('bcryptjs');
const {users} = require('../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;


const createUser = async (req, res) => {
   
    const { email, username, password, address } = req.body
    try{
    // Find a user if exist or not
  const userExist = await users.findOne({'email' : email})
  console.log( userExist)
    if(userExist)
   return res.send('Sorry user is actually exist!')
   
    // Hashing a password 
     const salt = await bcrypt.genSalt(10);
     const passwordHash = await bcrypt.hash(password, salt);
 
 
     // Create a new User
     const user = new users({
         method : 'local' ,
         email: email,
         username : username,
         local :{
         address: address,
        password: passwordHash,
         }
     });
    
     
         // Save a Created User
         await user.save();
         res.status(200).json({
             message: "Done Saved",
             createdUser: { userID: user._id, userEmail: user.local.email  }
         });



    }catch(err){
        console.log(err)
    }
}



 // Login
 const localStrategy= async (req, res) => {
    const { email , password} = req.body
   
    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
        }
      ));
  };


module.exports = {localStrategy , createUser }