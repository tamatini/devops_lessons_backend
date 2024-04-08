const Router = require('express').Router();
const lessonRouter = require('./lesson.routes');

Router.use('/lessons', lessonRouter);

module.exports = Router;