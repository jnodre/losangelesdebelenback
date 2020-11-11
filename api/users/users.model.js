const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required: true,
        minLength : 5
    },
    email : {
        type : String,
        unique: true,
        required: true,        
        validate : (email) => emailValid(email)
    },
    password : String,
    name : String,
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