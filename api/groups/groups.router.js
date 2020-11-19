const router = require('express').Router();
const controller = require('./groups.controller');

router.post('/creategroup', controller.createGroup);
router.get('/groups/:id', controller.getGroup);

module.exports = router;