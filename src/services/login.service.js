const jwtService = require('./jwt.service');
const { bodySchema } = require('../schema/loginSchema');
const { checkPassword } = require('./password.service');

const { User } = require('../database/models');

const validateBody = (body) => {
const { error, value } = bodySchema.validate(body);

if (error) throw error;

return value;
};

const validateUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error = new Error('Invalid fields');
    error.name = 'UnauthorizedError';
    throw error;
  }

  await checkPassword(password, user.password);

  const { password: _, ...userWithoutPassword } = user;

  const token = jwtService.createToken(userWithoutPassword.dataValues);

  return token;
};

module.exports = {
  validateBody,
  validateUser,
};
