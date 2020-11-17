const router = require('express').Router()
const controller = require('./users.controller');

router.post('/register', controller.createOne )
router.get('/:id', controller.getOneById);
router.put('/:id/hobbies', controller.selectHobbies);     //put method only for first selection
router.put('/:id/location', controller.selectLocation);   //put method only for first selection
module.exports = router;