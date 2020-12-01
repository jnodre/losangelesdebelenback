const router = require("express").Router();
const controller = require("./users.controller");

router.post("/register", controller.createOne);
router.get("/:id", controller.getOneById);
router.get("/:id/people", controller.getAllUsers);
router.get("/:id/friends", controller.getFriends);
router.patch("/:id/people", controller.giveMatch);
router.put("/:id/hobbies", controller.selectHobbies); //put method only for first selection
router.put("/:id/location", controller.selectLocation); //put method only for first selection
router.patch("/:id/hobbies", controller.editHobbies); //patch method only for modify hobbies
router.patch("/:id/password", controller.editPassword); //patch method only to modify my location
router.patch("/:id/facebook", controller.editFacebook); //patch method only to modify my Facebook
router.patch("/:id/instagram", controller.editInstagram); //patch method only to modify my Instagram
router.patch("/:id/whatsapp", controller.editWhatsapp); //patch method only to modify my WHatssap
router.patch("/:id/description", controller.editDescription); //patch method only to modify my Description
router.patch("/:id/name", controller.editName); //patch method only to modify my Name

//router.get("/", controller.getUsers);
module.exports = router;
