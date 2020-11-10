const router = require('express').Router()
const controller = require('./users.controller');

router.post('/register', controller.createOne )

module.exports = router;