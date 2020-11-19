const groupsModel = require("./groups.model");

module.exports.createGroup = createGroup;
module.exports.getGroup = getGroup;

function createGroup(req, res) {
  return groupsModel.create(req.body)
    .then(u => res.json(u))
    .catch(e => res.status(500).json(e))
}
 /*
function getGroup(req,res){
  return groupsModel.findOne(req.body)
  .then(u => res.json(u))
  .catch(e => res.status(500).json(e))
} 
*/
 function getGroup(req, res) {
  const { id } = req.params;
  return groupsModel
    .findOne({
      _id: id
    })
    .then(u => res.json(u))
    .catch(e => res.status(500).json(e))
}  