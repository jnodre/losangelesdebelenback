const router = require('express').Router();
const controller = require('./groups.controller');

router.post('/creategroup', controller.createGroup);
router.get('/:id', controller.getGroup);
router.put('/:id/members', controller.addMember);
router.get('/' , controller.getAllGroups);
//router.get('/:id/members' , controller.getAllMembers);

module.exports = router;