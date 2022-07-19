const loginRouter = require('./login.routes');
const userRouter = require('./user.routes');
const categoriesRouter = require('./categories.routes');
const blogPostsController = require('./blogPosts.routes');

module.exports = {
  loginRouter,
  userRouter,
  categoriesRouter,
  blogPostsController,
};