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

const topicSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    date: {
        type: Number,
        require: true
    },
    edited: {
        type: editedSchema
    },
    user: {
        type: userSchema,
        required: true
    }
});

const topicModel = mongoose.model('topic', topicSchema);

module.exports = topicModel;