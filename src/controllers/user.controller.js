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

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  return res.status(SUCESS.Ok).json(user);
};

module.exports = {
  createUser,
  getAllUsers,
  getById,
};