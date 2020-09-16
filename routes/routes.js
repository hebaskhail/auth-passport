var express = require('express');
var router = express.Router();
const passport = require('passport')
const FacebookStrategy = require('../controllers/facebookStrategy')
const googleStrategy = require('../controllers/googleStrategy')
const { localStrategy, createUser } = require('../controllers/localStrategy');


router.post('/signup', createUser);

router.get('/auth/google', passport.authenticate('google',
    {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/user.phonenumbers.read',
            'https://www.googleapis.com/auth/userinfo.email'


        ]
    }));

//callback route for google redirect
router.get('/auth/google/redirect', passport.authenticate('google'), async (req, res) => {
    res.redirect('/profile/')
})


router.get('/auth/facebook',
  passport.authenticate('facebook')
);

router.get('/auth/facebook', passport.authenticate('facebook',
{ scope: ['publish_actions'] }));

router.get('/auth/facebook/callback',passport.authenticate('facebook'), async (req, res) => {
        res.redirect('/profile/')
     })
 

module.exports = router;
