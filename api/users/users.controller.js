const bcrypt = require('bcrypt');
const groupsModel = require('../groups/groups.model');
const userModel = require("./users.model");

module.exports.createOne = createAcc;
module.exports.getOneById = getOneById;
module.exports.selectHobbies = selectHobbies;
module.exports.selectLocation = selectLocation;
module.exports.editHobbies = editHobbies;
module.exports.getAllUsers = getAllUsers;
module.exports.giveMatch = giveMatch;
module.exports.getFriends = getFriends;
module.exports.getUsers = getUsers;
module.exports.editPassword = editPassword;

function getUsers(req, res) {
  return userModel.find({}).then(response => {
    res.json(response)
  }).catch(e => res.status(500).json(e));
}

function getOneById(req, res) {
  const {
    id
  } = req.params;
  return userModel
    .findOne({
      _id: id
    })
    .then(u => res.json(u))
    .catch(e => res.status(500).json(e))
}

function createAcc(req, res) {
  return userModel
    .create(req.body)
    .then(u => res.json(u))
    .catch(e => res.status(500).json(e))
}

function selectHobbies(req, res) {
  const {
    id
  } = req.params;
  return userModel.findOne({
      _id: id
    })
    .then(async user => {
      if (user) {
        const newHobbies = req.body.hobbies; //array con hobbies
        user.hobbies = newHobbies;
        return user.save()
          .then(userEdited => {
            userEdited.hobbies.forEach(element => {
              groupsModel.findOne({
                group : element
              })
              .then(g =>{
                g.members.push(id);
                g.save();
                res.json(g);
              })
              .catch(e => res.status(500).json(e))           
            });
            res.json(userEdited);
          }).catch(e => res.status(500).json(e))
      } else {
        return res.status(400).send("That user doesnt exists ");
      }
    }).catch(e => res.status(500).json(e))

}

function selectLocation(req, res) {
  const {
    id
  } = req.params;
  return userModel.findOne({
      _id: id
    })
    .then(async user => {
      if (user) {
        const newLocation = req.body.location; //array con hobbies
        user.location = newLocation;
        return user.save()
          .then(userEdited => {
            return res.json(userEdited);
          })
      } else {
        return res.status(400).send("That user doesnt exists ");
      }
    }).catch(e => res.status(500).json(e))

}

function editHobbies(req, res) {
  const {
    id
  } = req.params;
  return userModel.findOne({
      _id: id
    })
    .then(async user => {
      user.hobbies.forEach(element =>{
        groupsModel.findOne({
          group : element
        }).then(g=> {
          g.members = g.members.filter(user => user._id != id);
          g.save();
        }).catch(e => res.status(500).json(e))
      })
      if (user) { 
        user.hobbies = req.body.hobbies;
        return user.save()
          .then(userEdited => {
            userEdited.hobbies.forEach(element => {
              groupsModel.findOne({
                group : element
              })
              .then(g => {
                if(!g.members.includes(id)){
                  g.members.push(id);
                  g.save();
                  return res.json(g);
                }else{
                  res.status(500).json("The user exist inside group");
                }
              })
            }).catch(e => res.status(500).json(e))
          }).catch(e => res.status(500).json(e))
      } else {
        return res.status(400).send("That user doesnt exists ");
      }
    }).catch(e => res.status(500).json(e))
}

function getAllUsers(req, res) {
  const {
    id
  } = req.params;
  return userModel.find({}).then(response => {
    res.json(response.filter(response => response.id != id));
  })
}

function giveMatch(req, res) {
  const id = req.params.id;
  const friendId = req.body.friendId;
  return userModel
    .findOne({
      _id: friendId
    })
    .then(u => {
      if (u.matches.includes(id)) {
        u.matches = u.matches.filter(idSearch => idSearch != id);
        u.friends.push(id);
        u.save()
          .then(arrow => {
            userModel
              .findOne({
                _id: id
              })
              .then(me => {
                me.matches = me.matches.filter(idSearch => idSearch != friendId);
                me.friends.push(friendId);
                me.save()
                  .then(e => res.status(200).json(e))
                  .catch(e => res.status(500).json(e))
                res.json(me);
              })
              .catch(e => res.status(500).json(e))
          })
          .catch(e => res.status(500).json(e))
      } else {
        userModel
          .findOne({
            _id: id
          })
          .then(mi => {
            mi.matches.push(friendId);
            mi.save()
              .then(e => res.status(200).json(e))
              .catch(e => res.status(500).json(e))
            res.json(mi);
          })
          .catch(e => res.status(500).json(e))
      }
    })
    .catch(e => res.status(500).json(e))
}

async function getFriends(req, res) {
  const {id} = req.params;
  return userModel.findOne({
      _id: id
    })
    .populate('friends')
    .then(user => {
        res.json(user.friends);
      });
}


function editPassword(req, res) {
  const {
      id
  } = req.params;
  return userModel.findOne({
          _id: id
      })
      .then(async user => {
          if (user) {
              user.password = bcrypt.hashSync(req.body.password, 10);
              return user.save()
                  .then(userEdited => {
                      return res.json(userEdited);
                  })
          } else {
              return res.status(400).send("That user doesnt exists ");
          }
      }).catch(e => res.status(500).json(e))
}
