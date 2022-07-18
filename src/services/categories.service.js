const Joi = require('joi');
const { Category } = require('../database/models');

const validateBody = (name) => {
  const schema = Joi.string().required().label('name');
  const { error, value } = schema.validate(name);

  if (error) throw error;

  return value;
};

const createCategory = async (name) => {
  validateBody(name);

  const category = await Category.create({ name });

  return category;
};

module.exports = {
  createCategory,
};
