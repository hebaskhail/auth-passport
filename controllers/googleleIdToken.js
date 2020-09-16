var {OAuth2Client} = require('google-auth-library');
const dotenv = require('dotenv').config()


const googleIdToken =  async (req, res) => {
var payload ;

  const client = new OAuth2Client(process.env.CLIENT_ID);
  async function verify() {

    const ticket = await client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    }); 
    payload = ticket.getPayload();
    const userid = payload['sub'];
   
   
    res.send(payload)
    //console.log(userid)
  }
  verify().catch(console.error);
 
}


module.exports =  googleIdToken 