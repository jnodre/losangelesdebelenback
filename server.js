
const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./api/users/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
require('dotenv').config()

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_ADMIN_PASSWORD}@cluster0.by8p6.mongodb.net/onlyfriends?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology:  true });

app.use(express.json())

app.post('/register', async function (req, res) {
    let body = req.body;
    let { username, email, password } = body;
    const newUser = await UserModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10)
    });
    delete newUser.password;
    return res.json(newUser);
  });

app.listen(3000, (err) => {
    if (err) return console.log('ERROR: ', err);
    console.log('Servidor corriendo en el 3000');
})