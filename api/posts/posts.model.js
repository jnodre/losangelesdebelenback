const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    post : {
        type: String
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    },
    groupID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'group',
    }
})

const postsModel = mongoose.model('posts', postsSchema)

module.exports = postsModel;