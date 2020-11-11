
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


app.listen(5000, (err) => {
    if (err) return console.log('ERROR: ', err);
    console.log('Servidor corriendo en el 5000');
})