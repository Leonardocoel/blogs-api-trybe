const blogPostsService = require('../services/blogPosts.sevice');
const { SUCESS } = require('../helpers/httpStatusCodes');

const createBlogPost = async (req, res) => {
  const { id } = req.user;

  const blogPost = await blogPostsService.createPost(req.body, id);

  res.status(SUCESS.Created).json(blogPost);
};

const getAllPosts = async (req, res) => {
  const posts = await blogPostsService.getAllPosts();

  res.status(SUCESS.Ok).json(posts);
};

module.exports = {
  createBlogPost,
  getAllPosts,
};