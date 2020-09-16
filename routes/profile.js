var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config()



/* GET home page. */
router.get('/profile', (req, res)=> {
  res.render('../view/profile.ejs')
});

module.exports = router;
