const bcrypt = require('bcrypt');
const userModel = require("./users.model");
const userSchema = require("./users.model");
const passport = require("passport")

module.exports.getOneById = getOneById;
module.exports.selectHobbies = selectHobbies;
module.exports.selectLocation = selectLocation;
module.exports.editHobbies = editHobbies;
module.exports.getAllUsers = getAllUsers;
module.exports.giveMatch = giveMatch;
module.exports.getFriends = getFriends;
module.exports.postSingup = postSingup;
module.exports.postLogin = postLogin;
module.exports.logout = logout;

function postSingup  (req, res, next) {
  const nuevoUsuario = new userSchema({
      email: req.body.email,
      nombre: req.body.nombre,
      password: req.body.password
  });


  userModel.findOne({email: req.body.email}, (err, usuarioExiste)=>{
      if(usuarioExiste){
        return res.status(400).send('El email ya está registrado');
      }
      nuevoUsuario.save().then( () =>
        req.login(nuevoUsuario, (err) => {
          if(err){
            next(err);
          }
          res.send('Usuario creado correctamente');
        })
  ).catch(err=> console.log(err))
})
}

function postLogin (req, res, next) {
  passport.authenticate('local', (err, usuario, info) => {
    if (err) {
      next(err);
    }
    if (!usuario) {
      return res.status(400).send('Email o contraseña no válidos');
    }
    req.login(usuario, (err) => {
      if (err) {
        next(err);
      }
      res.send('Login exitoso');
    })
  })(req, res, next);
}

function logout (req,res) {
  req.logout();
  res.send('Logout exitoso')
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