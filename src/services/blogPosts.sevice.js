const Sequelize = require('sequelize');
const {
  BlogPost,
  PostCategory,
  Category,
  User,
} = require('../database/models');
const { bodySchema } = require('../schema/postSchema');
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

module.exports = {
  createPost,
  getAllPosts,
};
