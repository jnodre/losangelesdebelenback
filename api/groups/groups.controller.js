const groupsModel = require("./groups.model");

module.exports.createGroup = createGroup;

function createGroup(req, res){
    return groupsModel.create(req.body)
    .then(u => res.json(u))
    .catch(e => res.status(500).json(e))
}