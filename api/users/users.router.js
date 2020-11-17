const router = require('express').Router()
const controller = require('./users.controller');

router.post('/register', controller.createOne )
router.get('/:id', controller.getOneById);
router.put('/:id/hobbies', controller.selectHobbies);     //put method only for first selection
router.put('/:id/location', controller.selectLocation);   //put method only for first selection
router.patch('/:id/hobbies', controller.editHobbies);     //patch method only for modify hobbies
router.patch('/:id', controller.editName);     //patch method only to modify my name
router.patch('/:id', controller.editMail);     //patch method only to modify my email
router.patch('/:id', controller.editGender);     //patch method only to modify my gender
router.patch('/:id/location', controller.editLocation);     //patch method only to modify my location
module.exports = router;