const helloLesson = (req, res) => {
    res.status(200).json({ message: 'Hello from the lesson controller!' });
} 

module.exports = {
    helloLesson
}