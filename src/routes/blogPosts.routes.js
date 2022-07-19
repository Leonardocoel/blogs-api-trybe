const { Router } = require('express');
const blogPostsController = require('../controllers/blogPost.controller');

const router = Router();

router.post('/', blogPostsController.createBlogPost);

router.get('/', blogPostsController.getAllPosts);

module.exports = router;