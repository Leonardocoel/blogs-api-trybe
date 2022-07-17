const loginService = require('../services/login.service');
const { SUCESS } = require('../helpers/httpStatusCodes');

const login = async (req, res) => {
  const credentials = await loginService.validateBody(req.body);

  const token = await loginService.validateUser(credentials);

  res.status(SUCESS.Ok).json({ token });
};

const validateToken = async (req, _res, next) => {
  const { authorization } = req.headers;
  const user = await loginService.validateToken(authorization);
  req.user = user;

  next();
};

module.exports = {
  login,
  validateToken,
};