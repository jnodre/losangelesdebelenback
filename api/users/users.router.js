const router = require('express').Router();
const jwt = require('jsonwebtoken');
const controller = require('./users.controller')

router.get('/:username', controller.getOneById);

module.exports = router;