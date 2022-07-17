const { Router } = require('express');
const userController = require('../controllers/user.controller');
const loginController = require('../controllers/login.controller');

const router = Router();

router.post('/', userController.createUser);

router.use(loginController.validateToken);

router.get('/', userController.getAllUsers);

module.exports = router;