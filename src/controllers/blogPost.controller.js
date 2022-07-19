const blogPostsService = require('../services/blogPosts.service');
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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostsService.getPostById(id);

  res.status(SUCESS.Ok).json(post);
};

module.exports = {
  createBlogPost,
  getAllPosts,
  getPostById,
};