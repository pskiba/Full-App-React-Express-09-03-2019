const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
});

const editedSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
});

const postSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    topicId: {
        type: String,
        required: true
    },
    user: {
        type: userSchema,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    date: {
        type: Number,
        required: true
    },
    edited: {
        type: editedSchema
    }

});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
