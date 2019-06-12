const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        trim: true,
        minlength: 5,
        required: true
    }
});

module.exports = {
    User
};