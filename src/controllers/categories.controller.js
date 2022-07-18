const categoriesService = require('../services/categories.service');
const { SUCESS } = require('../helpers/httpStatusCodes');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await categoriesService.createCategory(name);

  return res.status(SUCESS.Created).json(category);
};

module.exports = {
  createCategory,
};