const mongoose = require('mongoose');

const userSchema = mongoose.Schema({    
    email : {
        type : String,
        unique: true,
        required: true,        
        validate : (email) => emailValid(email)
    },
    password : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        //required: true,
    },
    description : {
        type: String,
        //required: true,
        minlength: 4,
        maxlength: 140
    },
    Facebook : {
        type: String,
    },
    Instagram : {
        type: String,
    },
    Whatssap : {
        type: Number,
    },
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

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;