const router = require('express').Router();
const controller = require('./groups.controller');

router.post('creategroup', controller.createGroup);
router.get('/groups', controller.getOneGroupById);

module.exports = router;