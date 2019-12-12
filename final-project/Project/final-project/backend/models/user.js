const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// Create Month Supply Schema
const userSchema = new Schema ({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        required: false
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
