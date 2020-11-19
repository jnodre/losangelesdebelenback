const mongoose = require('mongoose');

const groupsSchema = mongoose.Schema({
    group : {
        type: String,
        unique: true,
        required: true
    },
    members : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        unique: true
    }]
})

const groupsModel = mongoose.model('groups', groupsSchema)

module.exports = groupsModel;