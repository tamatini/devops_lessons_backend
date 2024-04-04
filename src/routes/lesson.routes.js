const Router = require("express").Router();
const lessonController = require("../controllers/lesson.controller");

Router.get("/", lessonController.getLessons);
Router.post("/new", lessonController.postLesson);
Router.delete("/delete/:id", lessonController.deleteLesson);
Router.put("/update/:id", lessonController.updateLesson);
Router.get("/:id", lessonController.getSingleLesson);

module.exports = Router;
