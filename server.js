const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./config/passport')
const controladorUsuario = require('./api/users/users.controller');
const cors = require('cors');
const usersRouter = require('./api/users/users.router');
const { Cookie } = require('express-session');
const app = express();
require('dotenv').config()
const MONGO_URL = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.juarj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err)=>{
  throw err;
  process.exit(1);
})

app.use(cors())



app.use(session({ 
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: false
  },
  store : new MongoStore({
      url: MONGO_URL,
      autoReconnet: true
  })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json())
app.use('/users', usersRouter)


app.post('/register', controladorUsuario.postSingup);
app.post('/login', controladorUsuario.postLogin);
app.get('/logout',passportConfig.estaAutenticado ,controladorUsuario.logout);
app.get('/usuarioInfo', passportConfig.estaAutenticado, (req, res) => {
    res.json(req.user);
})

app.listen(3000, ()=>{
  console.log(`escuchando en el puerto 3000`);
})