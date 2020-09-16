const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    email: {
        type: String,
       
    },
    username: {
        type: String,
    
    },
    local: {
        password: {
            type: String,
            
        },
        address: {
            type: String,
            
        }
    },
    google: {
         googleId: {
        type: String,
    }
},
    facebook : {
    facebookId: {
        type: String,
    },
}    
    })

const User = mongoose.model('User', userSchema);

module.exports.User = User;



