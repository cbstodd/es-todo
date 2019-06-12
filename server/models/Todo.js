const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
    id: {
        type: String,
        required: true,
        trim: true,
        minlength: 25
    },
    body: {
        type: String,
        minlength: 3,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number,
        default: null
    },
    createdAt: {
        type: Number,
        default: null
    },
    updatedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};