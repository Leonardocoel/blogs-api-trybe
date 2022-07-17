const { validateBody, validateUser } = require('../services/login.service');
const { SUCESS } = require('../helpers/httpStatusCodes');

const login = async (req, res) => {
  const credentials = await validateBody(req.body);

  const token = await validateUser(credentials);

  res.status(SUCESS.Ok).json({ token });
};

module.exports = {
  login,
};