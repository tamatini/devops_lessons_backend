const { mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

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


userSchema.pre('save', async function save() {
    const salted = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salted);
    this.password = await hashedPassword;
})

userSchema.methods.comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Comparing failed', error);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;