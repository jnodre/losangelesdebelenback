const bcrypt = require('bcrypt');
const userModel = require("./users.model");

module.exports.createOne = createAcc;
module.exports.getOneById = getOneById;
module.exports.selectHobbies = selectHobbies;
module.exports.selectLocation = selectLocation;
module.exports.selectGender = selectGender;
module.exports.editHobbies = editHobbies;
module.exports.editName = editName;
module.exports.editMail = editMail;
module.exports.editGender = editGender;
module.exports.editLocation = editLocation;
module.exports.editPassword = editPassword;

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

function createAcc(req, res) {
    return userModel
        .create(req.body)
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

function selectGender(req, res) {
    const {
        id
    } = req.params;
    return userModel.findOne({
            _id: id
        })
        .then(async user => {
            if (user) {
                const newGender = req.body.gender; //array con hobbies
                user.gender = newGender;
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

function editName(req, res) {
    const {
        id
    } = req.params;
    return userModel.findOne({
            _id: id
        })
        .then(async user => {
            if (user) {
                user.name = req.body.name;
                return user.save()
                    .then(userEdited => {
                        return res.json(userEdited);
                    })
            } else {
                return res.status(400).send("That user doesnt exists ");
            }
        }).catch(e => res.status(500).json(e))
}

function editMail(req, res) {
    const {
        id
    } = req.params;
    return userModel.findOne({
            _id: id
        })
        .then(async user => {
            if (user) {
                user.email = req.body.email;
                return user.save()
                    .then(userEdited => {
                        return res.json(userEdited);
                    })
            } else {
                return res.status(400).send("That user doesnt exists ");
            }
        }).catch(e => res.status(500).json(e))
}

function editGender(req, res) {
    const {
        id
    } = req.params;
    return userModel.findOne({
            _id: id
        })
        .then(async user => {
            if (user) {
                user.gender = req.body.gender;
                return user.save()
                    .then(userEdited => {
                        return res.json(userEdited);
                    })
            } else {
                return res.status(400).send("That user doesnt exists ");
            }
        }).catch(e => res.status(500).json(e))
}

function editLocation(req, res) {
    const {
        id
    } = req.params;
    return userModel.findOne({
            _id: id
        })
        .then(async user => {
            if (user) {
                user.location = req.body.location;
                return user.save()
                    .then(userEdited => {
                        return res.json(userEdited);
                    })
            } else {
                return res.status(400).send("That user doesnt exists ");
            }
        }).catch(e => res.status(500).json(e))
}
function editPassword(req, res) {
    const {
        id
    } = req.params;
    return userModel.findOne({
            _id: id
        })
        .then(async user => {
            if (user) {
                user.password = bcrypt.hashSync(req.body.password, 10);
                return user.save()
                    .then(userEdited => {
                        return res.json(userEdited);
                    })
            } else {
                return res.status(400).send("That user doesnt exists ");
            }
        }).catch(e => res.status(500).json(e))
}
