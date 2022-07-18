const categoriesService = require('../services/categories.service');
const { SUCESS } = require('../helpers/httpStatusCodes');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await categoriesService.createCategory(name);

  return res.status(SUCESS.Created).json(category);
};

const getAllCategories = async (req, res) => {
  const categories = await categoriesService.getAllCategories();

  return res.status(SUCESS.Ok).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};