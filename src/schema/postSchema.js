const Joi = require('joi');

const bodySchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const bodySchemaNoCategory = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

module.exports = {
  bodySchema,
  bodySchemaNoCategory,
};
