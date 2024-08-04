const User = require('../models/user.model');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req?.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const postUser = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req?.body;
        const validateUser = await User.validate({ username, email, password, firstName, lastName });
        if (validateUser) {
            const newUser = new User({
                username,
                email,
                password,
                firstName,
                lastName
            });
            await newUser.save();
            res.status(201).json({ message: 'User has been created' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async(req, res) => {
    try {
        const user = await User.findById(req?.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { firstName, lastName } = req?.body;
        !firstName && res.status(400).json({ message: 'Firstname is required' });
        !lastName && res.status(400).json({ message: 'Lastname is required' });
        await User.updateOne({ _id: req?.params.id }, 
            {
                $set: {
                    firstName: req?.body.firstName,
                    lastName: req?.body.lastName
                }
            }
        );
        res.status(201).json({ message: 'User has been updated' });
    } catch(err) {
        res.status(500).json({ message: error });
    }
} 



module.exports = {
    getUsers,
    getSingleUser,
    postUser,
    updateUser
};