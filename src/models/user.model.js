const { mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username is already taken']
    },
    email: {
        type: String,
        unique: [true, 'Email is already taken'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: [6, 'Password must be at least 6 characters long'],
        RegExp: [/^[a-zA-Z0-9]{6,}$/, 'Password must contain only letters and numbers']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
})


userSchema.methods.hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw new Error('Hashing failed', error);
    }
}

userSchema.methods.comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Comparing failed', error);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;