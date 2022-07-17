const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
  const saltRounds = 8;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const checkPassword = async (password, passwordDB) => {
  const match = await bcrypt.compare(password, passwordDB) || password === passwordDB; 

  if (!match) {
    const error = new Error('Invalid fields');
    error.name = 'UnauthorizedError';
    throw error;
  }
};

module.exports = {
  encryptPassword,
  checkPassword,
};
