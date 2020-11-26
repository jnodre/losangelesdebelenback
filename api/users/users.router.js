const router = require('express').Router()
const controller = require('./users.controller');
const passport = require('./../../config/passport')

router.get('/:id', passport.estaAutenticado, controller.getOneById);
router.get('/:id/people', passport.estaAutenticado,controller.getAllUsers);
router.get('/:id/friends', passport.estaAutenticado,controller.getFriends);
router.patch('/:id/people',passport.estaAutenticado ,controller.giveMatch);
router.put('/:id/hobbies', passport.estaAutenticado,controller.selectHobbies);     //put method only for first selection
router.put('/:id/location', passport.estaAutenticado,controller.selectLocation);   //put method only for first selection
router.patch('/:id/hobbies',passport.estaAutenticado ,controller.editHobbies);     //patch method only for modify hobbies
module.exports = router;
