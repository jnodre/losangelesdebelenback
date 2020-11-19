const groupsModel = require("./groups.model");

module.exports.createGroup = createGroup;
module.exports.getOneGroupById = getOneGroupById;

function createGroup(req, res){
    return groupsModel.create(req.body)
    .then(u => res.json(u))
    .catch(e => res.status(500).json(e))
}

function getOneGroupById(req, res) {
    const {
      id
    } = req.body;
    return groupsModel
      .findOne({
        _id: id
      })
      .then(u => res.json(u))
      .catch(e => res.status(500).json(e))
  }