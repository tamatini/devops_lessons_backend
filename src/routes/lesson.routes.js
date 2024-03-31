const Router = require('express').Router();
const lessonController = require('../controllers/lesson.controller');

Router.get('/', lessonController.getLessons);
Router.get('/hello', lessonController.helloLesson);

module.exports = Router;