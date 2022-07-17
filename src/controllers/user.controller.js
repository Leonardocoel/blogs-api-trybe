const userService = require('../services/user.service');
const { SUCESS } = require('../helpers/httpStatusCodes');

const createUser = async (req, res) => {
  const token = await userService.createUser(req.body);

  return res.status(SUCESS.Created).json({ token });
};

module.exports = {
  createUser,
};