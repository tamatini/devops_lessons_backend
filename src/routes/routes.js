const Router = require('express').Router();
const lessonRouter = require('./lesson.routes');

Router.use('/lesson', lessonRouter);

module.exports = Router;