const express = require('express');
require('express-async-errors');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes/index.routes');
const loginController = require('./controllers/login.controller');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/login', router.loginRouter);
app.use('/user', router.userRouter);
// app.use(loginController.validateToken);
app.use(errorMiddleware);

module.exports = app;
