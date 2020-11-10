const userModel = require("./users.model");
const bcrypt = require('bcrypt');

module.exports.getOneById = getOneById;


function getOneById(req, res) {
    const  usernameToFind = req.params.username ;
    return userModel
        .findOne( { username : usernameToFind } )
        .then(u => res.json(u) )
        .catch(e => res.status(500).json(e) )
}