const Lessons = require('../models/lesson.model');

const helloLesson = (req, res) => {
    res.status(200).json({ message: 'Hello from the lesson controller!' });
} 

const getLessons = async (req, res) => {
    try {
        const lessons = await Lessons.find();
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    helloLesson,
    getLessons
}