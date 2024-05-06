const Lessons = require("../models/lesson.model");

const getLessons = async (req, res) => {
  try {
    const lessons = await Lessons.find();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleLesson = async (req, res) => {
  try {
    const lesson = await Lessons.findById(req.params.id);
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postLesson = async (req, res) => {
  try {
    const body = req.body;
    const error = checkLesson(body);
    if (error !== null) {
      return res.status(400).json({
        message: error,
      });
    } else {
      const newLesson = new Lessons({
        title: req.body.title,
        content: req.body.content,
        isPublished: req.body.isPublished,
      });
      await newLesson.save();
      res.status(201).json(newLesson);
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateLesson = async (req, res) => {
  try {
    const body = req.body;
    const error = checkLesson(body);
    if (error !== null) {
      return res.status(400).json({
        message: error,
      });
    } else {
      const lesson = await Lessons.findById(req.params.id);
      lesson.title = req.body.title;
      lesson.content = req.body.content;
      lesson.isPublished = req.body.isPublished;
      await lesson.save();
      res.status(200).json({ message: "Lesson updated" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lessons.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }
    await Lessons.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Lesson deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const checkLesson = (lesson) => {
  if (!lesson.title || lesson.title === "") {
    return "Title is required";
  }

  if (!lesson.content || lesson.content === "") {
    return "Content is required";
  }

  if (lesson.isPublished === undefined) {
    return "Lesson must be published or not";
  }

  return null;
};

module.exports = {
  getLessons,
  getSingleLesson,
  postLesson,
  updateLesson,
  deleteLesson,
};
