const router = require('express').Router();
const controller = require('./groups.controller');

router.post('/creategroup', controller.createGroup);
router.get('/:id', controller.getGroup);
router.put('/:id/members', controller.addMember);
router.get('/:id/members' , controller.getAllMembers);
router.get('/' , controller.getAllGroups);

module.exports = router;