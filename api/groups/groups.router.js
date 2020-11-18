const router = require('express').Router();
const controller = require('/groups.controller');

router.post('creategroup', controller.createGroup);

module.exports = router;