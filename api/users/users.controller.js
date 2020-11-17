const bcrypt = require('bcrypt');
const userModel = require("./users.model");

module.exports.createOne = createAcc;
module.exports.getOneById = getOneById;
module.exports.selectHobbies = selectHobbies;
module.exports.selectLocation = selectLocation;
module.exports.editHobbies = editHobbies;
module.exports.getAllUsers = getAllUsers;
module.exports.giveMatch = giveMatch;

function getOneById(req, res) {
  const {id} = req.params;
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
            return res.json(userEdited);
          })
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
      if (user) {
        user.hobbies = req.body.hobbies;
        return user.save()
          .then(userEdited => {
            return res.json(userEdited);
          })
      } else {
        return res.status(400).send("That user doesnt exists ");
      }
    }).catch(e => res.status(500).json(e))
}

function getAllUsers(req, res) {
  const {id} = req.params;
  return userModel.find({}).then(response => {
    res.json(response.filter(response => response.id!=id));
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