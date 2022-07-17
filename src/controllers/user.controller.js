const userService = require('../services/user.service');
const { SUCESS } = require('../helpers/httpStatusCodes');

const createUser = async (req, res) => {
  const token = await userService.createUser(req.body);

  return res.status(SUCESS.Created).json({ token });
};

const getAllUsers = async (req, res) => {
  const AllUsers = await userService.getAllUsers();

  return res.status(SUCESS.Ok).json(AllUsers);
};

module.exports = {
  createUser,
  getAllUsers,
};