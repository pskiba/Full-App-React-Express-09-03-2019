const express = require('express');
const mongoose = require('mongoose');
const postModel = require('../../mongoDB/postModel');
const topicModel = require('../../mongoDB/topicModel');
const {checkAuth, verifyAdminOrAuthorPost} = require('../middlewares/checkAuth');

const postRouter = express.Router();

postRouter.get('/', (req, res, next) => {
    postModel.find()
        .then((records) => {
            res.status(200).json({
                posts: records
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        })
});
postRouter.get('/topic/:title', (req, res, next) => {
    topicModel.findOne({title: req.params.title})
        .then((record) => {
            if(record && record._id) {
                postModel.find({topicId: record._id})
                    .then((records) => {
                        res.status(200).json({
                            posts: records
                        });
                    })
            }

        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        })
});

postRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    postModel.findById(id)
        .then((record) => {
            if(record) {
                res.status(200).json({
                    post: record
                });
            } else {
                res.status(404).json({
                    message: 'no found'
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

postRouter.post('/', (req, res, next) => {
    topicModel.findOne({title: req.body.topic})
        .then((record) => {
            if(record && record._id) {
                const post = new postModel({
                    _id: new mongoose.Types.ObjectId,
                    date: new Date().getTime(),
                    title: req.body.title,
                    content: req.body.content,
                    topicId: record._id,
                    user: req.body.user
                });
                post.save()
                    .then((record) => {
                        res.status(201).json({
                            post: record
                        });
                    })
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        });
});

postRouter.patch('/:id',checkAuth, verifyAdminOrAuthorPost, (req, res, next) => {
    const id = req.params.id;
    const toUpdate = {
        content: req.body.content,
        edited: {
            _id: req.userData._id,
            nick: req.userData.nick,
            date: new Date().getTime()
        }
    };
    console.log(toUpdate);
    postModel.findOneAndUpdate({_id: id}, {$set: toUpdate})
        .then((record) => {
            if(record._id) {
                postModel.findById(record._id)
                    .then((record) => {
                        res.status(201).json({
                            post: record
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

postRouter.delete('/:id', checkAuth, verifyAdminOrAuthorPost, (req, res, next) => {
    const id = req.params.id;

    postModel.findByIdAndRemove(id)
        .then((resold) => {
            res.status(201).json({
                resold: resold
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });

});

module.exports = postRouter;