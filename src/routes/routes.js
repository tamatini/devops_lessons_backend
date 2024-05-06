const Router = require('express').Router();
const lessonRouter = require('./lesson.routes');
const userRouter = require('./user.routes');

Router.use('/users', userRouter);
Router.use('/lessons', lessonRouter);

module.exports = Router;