const usersModel = require("./users.model");
const bcrypt = require('bcrypt');

module.exports.createOne = createAcc;

function createAcc(req, res) {
    return userModel
        .create( req.body )
        .then(u => res.json(u) )
        .catch(e => res.status(500).json(e) )
  }