const router = require('express').Router();
const controller = require('./posts.controller');

router.post('/createPost', controller.createPost);
router.get('/:id/posts/:id/' , controller.getPosts)

module.exports = router;