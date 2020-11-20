const groupsModel = require("./groups.model");
const userModel = require("../users/users.model");

module.exports.createGroup = createGroup;
module.exports.getGroup = getGroup;
module.exports.addMember = addMember;
module.exports.getAllGroups = getAllGroups;
//module.exports.getAllMembers = getAllMembers;

function createGroup(req, res) { //No sobra este?
  return groupsModel.create(req.body)
    .then(u => res.json(u))
    .catch(e => res.status(500).json(e))
}

function getAllGroups(req, res){
  return groupsModel.find({}).then(response => {
    res.json(response);
  }).catch(e => res.status(500).json(e));
}

function getGroup(req, res) {
  const {
    id
  } = req.params;
  return groupsModel
    .findOne({
      _id: id
    })
    .populate('members') //He añadido esto para que popule y al buscar el grupo, muestre también sus miembros
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

/* ESTO HAY QUE HACERLO EN SERVER.JS PARA QUE LA RUTA NO SEA /GROUPS/LOQUESEA Y SEA /HOME/:ID
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
}*/
