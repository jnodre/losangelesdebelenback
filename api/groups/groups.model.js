const mongoose = require('mongoose');

const groupsSchema = mongoose.Schema({
    group : {
        type: String,
        required: true,
    },
    members : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    }]
})

const groupsModel = mongoose.model('groups', groupsSchema)

module.exports = groupsModel;