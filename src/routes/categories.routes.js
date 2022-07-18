const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');

const router = Router();

router.post('/', categoriesController.createCategory);

router.get('/', categoriesController.getAllCategories);

module.exports = router;