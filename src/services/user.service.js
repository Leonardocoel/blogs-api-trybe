const { User } = require('../database/models');
const { bodySchema } = require('../schema/userSchema');
const { encryptPassword } = require('./password.service');
const jwtService = require('./jwt.service');

const validateBody = async (body) => {
  const { error, value } = bodySchema.validate(body);
  const { email } = value;
  const user = await User.findOne({ where: { email } });

  if (error) throw error;
  if (user) {
    const err = new Error('User already registered');
    err.name = 'ConflictError';
    throw err;
  }

  return value;
  };

const createUser = async (body) => {
  const validate = await validateBody(body);
  const password = await encryptPassword(validate.password);
  const { password: _, ...userWithoutPassword } = validate;

  await User.create({ ...userWithoutPassword, password });
  
  const token = jwtService.createToken(userWithoutPassword);

  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) {
    const err = new Error('User does not exist');
    err.name = 'NotFoundError';
    throw err;
  }
  
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getById,
};