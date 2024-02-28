const Router = require('express').Router();
const lessonController = require('../controllers/lesson.controller');

Router.get('/', lessonController.helloLesson);

module.exports = Router;