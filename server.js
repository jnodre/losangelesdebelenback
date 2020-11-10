
const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./api/users/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
require('dotenv').config()

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_ADMIN_PASSWORD}@cluster0.lpvxz.mongodb.net/onlyfriends?retryWrites=true&w=majority`, 
{ useNewUrlParser: true, useUnifiedTopology:  true });

app.use(express.json())

app.get('/', function (req, res) {
    UserModel.findOne({ username: req.body.username })
      .then( usuarioDB => {
      
        // Verifica que exista un usuario con el mail escrita por el usuario.
           if (!usuarioDB) {
              return res.status(400).json({message: "Usuario o contraseña incorrectos"})
           }
          // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
         if (! bcrypt.compareSync(req.body.password, usuarioDB.password)){
            return res.status(400).json({message: "Usuario o contraseña incorrectos"});
         }
  
          // Genera el token de autenticación
          let token = jwt.sign({ usuario: usuarioDB }, "SECRET")
          res.json({
            usuario: usuarioDB,
            token
          })
  
      })
      .catch(erro =>  {
         return res.status(500).json( erro )
     })
  });

const usersRouter = require('./api/users/users.router')
app.use('/users', usersRouter)

app.listen(5000, (err) => {
    if (err) return console.log('ERROR: ', err);
    console.log('Servidor corriendo en el 5000');
})