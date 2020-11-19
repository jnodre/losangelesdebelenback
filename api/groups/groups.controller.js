const groupsModel = require("./groups.model");

module.exports.createGroup = createGroup;
module.exports.getGroup = getGroup;
module.exports.addMember = addMember;
module.exports.getAllMembers = getAllMembers;

function createGroup(req, res) {
  return groupsModel.create(req.body)
    .then(u => res.json(u))
    .catch(e => res.status(500).json(e))
}

function getGroup(req, res) {
  const {
    id
  } = req.params;
  return groupsModel
    .findOne({
      _id: id
    })
    .then(u => res.json(u))
    .catch(e => res.status(500).json(e))
}

function addMember(req, res) {
  const id = req.params.id;
  const memberId = req.body.id;

  return groupsModel.findOne({
      _id: id
    })
    .then(groups => {
      if (groups) {
        if (!groups.members.includes(memberId)) {
          groups.members.push(memberId);
          return groups.save()
            .then(groupEdited => {
              return res.json(groupEdited);
            }).catch(e => res.status(500).json(e))
        }else{
          res.status(500).json("This user exits in this group");
        }
      } else {
         res.status(400).send("That group doesnt exists ");
      }
    }).catch(e => res.status(500).json(e))
}

function getAllMembers(req , res){
  const {
    id
  } = req.params;
  return groupsModel.findOne({
    _id : id
  })
  .populate('members')
  .then(group => {
    res.json(group.members);
  })
}