const { CLIENT_ERROR, SERVER_ERROR } = require('../helpers/httpStatusCodes');

const errors = {
  ValidationError: CLIENT_ERROR.badRequest,
  UnauthorizedError: CLIENT_ERROR.unauthorized,
  NotFoundError: CLIENT_ERROR.notFound,
  ConflictError: CLIENT_ERROR.conflict,
  InternalServerError: CLIENT_ERROR.InternalServerError,
};

module.exports = async ({ name, message }, _req, res, _next) => {
  const code = errors[name];
  
  if (!code) return res.status(SERVER_ERROR.InternalServerError).end();
  
  res.status(code).json({ message }); 
};