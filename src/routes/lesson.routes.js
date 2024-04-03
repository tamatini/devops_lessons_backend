const Router = require('express').Router();
const lessonController = require('../controllers/lesson.controller');

Router.get('/', lessonController.getLessons);
Router.get('/hello', lessonController.helloLesson);
Router.get('/:id', lessonController.getSingleLesson);

module.exports = Router;