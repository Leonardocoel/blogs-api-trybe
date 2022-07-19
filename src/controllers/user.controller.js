const userService = require('../services/user.service');
const { SUCESS } = require('../helpers/httpStatusCodes');

const createUser = async (req, res) => {
  const token = await userService.createUser(req.body);

  res.status(SUCESS.Created).json({ token });
};

const getAllUsers = async (req, res) => {
  const AllUsers = await userService.getAllUsers();

  res.status(SUCESS.Ok).json(AllUsers);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  res.status(SUCESS.Ok).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;

  await userService.deleteUser(id);

  res.status(SUCESS.noContent).end();
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
