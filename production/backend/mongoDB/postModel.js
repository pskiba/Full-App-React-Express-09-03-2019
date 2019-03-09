const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    }

});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
