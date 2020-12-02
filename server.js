// Config ------------------

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const _ = require("lodash");

require("dotenv").config();

mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGODB_ADMIN_PASSWORD}@cluster0.by8p6.mongodb.net/onlyfriends?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors({
  origin: true
}));
app.use(express.json());

//Router
const usersRouter = require("./api/users/users.router");
const groupsRouter = require("./api/groups/groups.router");

//Model
const UserModel = require("./api/users/users.model");
const groupsModel = require("./api/groups/groups.model");
const { findIndex, indexOf } = require("lodash");

//App.use
app.use("/users", usersRouter);
app.use("/groups", groupsRouter);

//-------------------------
//Users  ---------------

app.post("/login", function (req, res) {
  UserModel.findOne({
      email: req.body.email,
    })
    .then((usuarioDB) => {
      // Verifica que exista un usuario con el mail escrita por el usuario.
      if (!usuarioDB) {
        return res.status(400).json({
          message: "Usuario o contraseña incorrectos",
        });
      }
      // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (!bcrypt.compareSync(req.body.password, usuarioDB.password)) {
        return res.status(400).json({
          message: "Usuario o contraseña incorrectos",
        });
      }

      // Genera el token de autenticación
      let token = jwt.sign({
          usuario: usuarioDB,
        },
        "SECRET"
      );
      res.json({
        usuario: usuarioDB,
        token,
      });
    })
    .catch((erro) => {
      return res.status(500).json(erro);
    });
});

app.post("/register", async function (req, res) {
  let body = req.body;
  let {
    name,
    email,
    password
  } = body;
  const newUser = await UserModel.create({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  delete newUser.password;
  return res.json(newUser);
});

//----------------------
//Groups ------------

app.post("/creategroup", async function (req, res) {
  let body = req.body;
  let {
    group
  } = body;
  const newGroup = await groupsModel
    .create({
      group,
    })
    .then(res.json("Group created"))
    .catch(res.status(500).json("Problem creating group"));
  return res.status(200).json(newGroup);
});

app.get("/home/:id", function (req, res) {
  const {
    id
  } = req.params;
  UserModel.findOne({
    _id: id,
  }).then((user) => {
    let arr = [];
    user.hobbies.forEach((element) => {
      arr.push(
        groupsModel
        .findOne({
          group: element,
        })
        .populate("members")
        .then((g) => {
          const others = g.members.filter(u => u._id != id);
          const prueba = others.filter(x =>! user.friends.includes(x.id));
          const final = prueba.filter( y =>! user.matches.includes(y.id));
          //Si cambias const others por let, funciona también y no hace falta incluir el const prueba
          //others = others.filter(x =>! user.friends.includes(x.id));
          return final;
        })
        .catch((e) => res.status(500).json(e))
      );
    });
    Promise.all(arr).then(users => {
      //Convertimos el array de arrays que devuelve la función anterior en un array de objetos
      const newArray = [...new Set(users)];
      var merged = [].concat.apply([], newArray);
      //Eliminamos los duplicados
      var seen = new Set();
      var filteredArr = merged.filter(el => {
        var duplicate = seen.has(el.id);
        seen.add(el.id);
        return !duplicate;
      });
      res.json(filteredArr)
    });
  });
});

app.listen(3000, (err) => {
  if (err) return console.log("ERROR: ", err);
  console.log("Servidor corriendo en el 3000");
});