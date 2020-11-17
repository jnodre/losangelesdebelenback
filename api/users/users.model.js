const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required: true,
        minLength : 5
    },
    email : {
        type : String,
        required: true,
        unique: true,
        validate : (email) => emailValid(email)
    },
    password : {
        type: String,
        required: true,
    },
    name : String,
    hobbies: [
        {
            type: String
        }
    ],
    location: {
        type: String,
        minLength: 5
    },
    photos : [
        {
            type: String
        }
    ],
    matches : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    ],
    friends : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    ]
})
function emailValid(email){
    return /^\S+@\S+.\S+$/.test(email) 
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;