const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const saltRounds = 10;

const userSchema = new Schema({    
    email : {
        type : String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate : (email) => emailValid(email)
    },
    password : {
        type: String,
        required: true,
    },
    name : String,
    surname : String,
    gender : {
        type: String,
        enum : [
            "Femenino",
            "Masculino",
            "Otros"
        ]
    },
    hobbies: [
        {
            type: String,
            enum: [
                "Fútbol",
                "Tenis",
                "Videojuegos",
                "PlayStation 4",
                "PlayStation 5",
                "Viajar",
                "Caminar",
                "Fitness",
                "Among US",
                "Informática",
                "Progrmación",
                "Boxeo",
                "Kick Boxing",
                "Xbox",
                "Gaming",
                "Perros",
                "Gatos",
                "Caballos",
                "Hamsters",
                "Coches",
                "Motos",
                "Pintura",
                "Geografía",
                "Matemáticas",
                "Negocios",
                "StartUps"
            ]
        }
    ],
    location: {
        type: String,
        minLength: 5,
        enum : [
            "Las Palmas de Gran Canaria",
            "Telde",
            "Santa María de Guía",
            "Gáldar",
            "Arucas",
            "Agaete",
            "Santa Brígida",
            "Moya",
            "Firgas",
            "Teror",
            "Valleseco",
            "Vega de San Mateo",
            "Valsequillo",
            "Ingenio",
            "Agüimes",
            "Santa Lucía de Tirajana",
            "Mogán",
            "La aldea de San Nicolás",
            "Artenara",
            "Tejeda"
        ]
    },
    photos : [
        {
            type: String
        }
    ],
    matches : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    ],
    friends : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    ]
})
function emailValid(email){
    return /^\S+@\S+.\S+$/.test(email) 
}

userSchema.pre('save', function(next){
    const usuario = this;
    if(!usuario.isModified('password')){
        return next();
    }
    
    bcrypt.genSalt(saltRounds,(err,salt)=>{
        if(err){
           return next(err);
        }
        bcrypt.hash(usuario.password, salt, (err,hash)=> {
            if(err){
                next(err);
            }
            usuario.password = hash;
            next();
        })
    })
})

userSchema.methods.compararPassword = function (password,callback){
    bcrypt.compare(password, this.password, (err, sonIguales) =>{
        if(err){
            return callback(err);
        } 
        return callback(null, sonIguales)
    })
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;