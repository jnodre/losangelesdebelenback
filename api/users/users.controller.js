
const bcrypt = require('bcrypt');
const userModel = require("./users.model");

module.exports.createOne = createAcc;
module.exports.getOneById = getOneById;
module.exports.selectHobbies = selectHobbies;
module.exports.selectLocation = selectLocation;


function getOneById(req, res) {
    const  usernameToFind = req.params.username ;
    return userModel
        .findOne( { username : usernameToFind } )
        .then(u => res.json(u) )
        .catch(e => res.status(500).json(e) )
}
function createAcc(req, res) {
    return userModel
        .create( req.body )
        .then(u => res.json(u) )
        .catch(e => res.status(500).json(e) )
  }
 
  function selectHobbies(req, res) {
    return userModel.findOne({ username: req.params.username })
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
      }) .catch(e => res.status(500).json(e) )
  
  }
  function selectLocation(req, res) {
    return userModel.findOne({ username: req.params.username })
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
      }) .catch(e => res.status(500).json(e) )

  }