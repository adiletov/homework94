const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');

const newSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    facebookId: String,
    token: {
        type: String,
        required: true
    },
    avatar: String,
    username_changed: {
        type: Boolean,
        default: false
    },
    avatar_change: {
        type: Boolean,
        default: false
    },
    subscriptions: {
        type: [String],
    }
});

newSchema.methods.generationToken = function () {
    this.token = nanoid()
};

newSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next()
});

newSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret
    }
});

const User = mongoose.model('User', newSchema);

module.exports = User;