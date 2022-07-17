const { CLIENT_ERROR, SERVER_ERROR } = require('../helpers/httpStatusCodes');

const errors = {
  ValidationError: CLIENT_ERROR.badRequest,
  UnauthorizedError: CLIENT_ERROR.unauthorized,
  ConflictError: CLIENT_ERROR.conflict,
};

module.exports = async ({ name, message }, _req, res, _next) => {
  const code = errors[name];
  
  if (!code) return res.sendStatus(SERVER_ERROR.InternalServerError);
  
  res.status(code).json({ message }); 
};