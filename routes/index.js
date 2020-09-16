var express = require('express');
var router = express.Router();
const {  googleIdToken } = require('../controllers/googleleIdToken');



/* GET home page. */
router.get('/test', (req, res)=> {
  res.render('../view/main.ejs')
});
router.get('/', (req, res)=> {
  res.render('../view/main.ejs')
});

router.get('/login', (req, res)=>{
  res.render('../view/login.ejs')
})



// to verify id token and get user information.
router.post('/test' ,  googleIdToken)
 


module.exports = router;