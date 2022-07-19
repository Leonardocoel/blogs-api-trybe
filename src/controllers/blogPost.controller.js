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

const updatePost = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  const uptPost = await blogPostsService.updatePost(userId, id, req.body);

  res.status(SUCESS.Ok).json(uptPost);
};

const deletePost = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  await blogPostsService.deletePost(userId, id);

  res.status(SUCESS.noContent).end();
};

module.exports = {
  createBlogPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};