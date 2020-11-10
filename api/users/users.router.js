const router = require('express').Router()
const controller = require('./users.controller');

router.post('/', controller.createOne )

module.exports = router;