const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../database/models');
const { bodySchema, bodySchemaNoCategory } = require('../schema/postSchema');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validateBody = async (body) => {
  const { error, value } = bodySchema.validate(body);

  if (error) throw error;

  const { count, rows } = await Category.findAndCountAll({
    where: { id: value.categoryIds },
    attributes: [['id', 'categoryId']],
    raw: true,
  });

  if (count < 1) {
    const err = new Error('"categoryIds" not found');
    err.name = 'ValidationError';
    throw err;
  }

  value.categoryIds = rows;
  return value;
};

const createPost = async (body, userId) => {
  const { categoryIds, ...post } = await validateBody(body);

  try {
    const result = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create({ userId, ...post }, { transaction: t });
      const { id: postId } = blogPost.toJSON();
      const postCategory = categoryIds.map(({ categoryId }) => ({
        categoryId,
        postId,
      }));

      await PostCategory.bulkCreate(postCategory, { transaction: t });

      return blogPost;
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ] });

  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    const err = new Error('Post does not exist');
    err.name = 'NotFoundError';
    throw err;
  }

  return post;
};

const updateValidation = async (user, id, body) => {
  const { userId } = await getPostById(id);

  if (userId !== user) {
  const err = new Error('Unauthorized user');
  err.name = 'UnauthorizedError';
  throw err;
}

  const { error, value } = bodySchemaNoCategory.validate(body);
  if (error) throw error;

  return value;
};

const updatePost = async (userId, id, body) => {
  const post = await updateValidation(userId, id, body);
  const uptPost = await BlogPost.update(post, {
    where: {
      id,
      userId,
    },
    fields: ['title', 'content'],
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (uptPost > 0) return getPostById(id);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
