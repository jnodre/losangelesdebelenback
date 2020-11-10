const router = require('express').Router()
const controller = require('./users.controller');

router.post('/register', controller.createOne )
router.get('/:username', controller.getOneById);
router.put('/:username/hobbies', controller.selectHobbies);
module.exports = router;