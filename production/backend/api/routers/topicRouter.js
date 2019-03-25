const express = require('express');
const mongoose = require('mongoose');
const topicModel = require('../../mongoDB/topicModel');
const {checkAuth, verifyAdminOrAuthorTopic} = require('../middlewares/checkAuth');

const topicRouter = express.Router();

topicRouter.get('/', (req, res, next) => {
    topicModel.find()
        .then((records) => {
            res.status(200).json({topics: records});
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

topicRouter.post('/', (req, res, next) => {
    topicModel.findOne({title: req.body.title})
        .then((record) => {
            if(record) {
                res.status(409).json({message: 'this topic exist'});
            } else {
                const topic = new topicModel({
                    _id: new mongoose.Types.ObjectId(),
                    title: req.body.title,
                    date: new Date().getTime(),
                    user: req.body.user
                });
                topic.save()
                    .then((record) => {
                        res.status(201).json({topic: record, message: 'topic created'});
                    });
            }
        })
        .catch((err) => {
            res.status(409).json({error: err});
        });
});

topicRouter.patch('/:id', checkAuth, verifyAdminOrAuthorTopic, (req, res, next) => {
    const id = req.params.id;
    const toUpdate = {
        title: req.body.title,
        edited: {
            _id: req.userData._id,
            nick: req.userData.nick,
            date: new Date().getTime()
        }
    };
    topicModel.findOne(toUpdate)
        .then((record) => {
            if(!record) {
                topicModel.findOneAndUpdate({_id: id}, {$set: toUpdate})
                    .then((record) => {
                        if(record._id) {
                            topicModel.findById(record._id)
                                .then((record) => {
                                    res.status(201).json({
                                        topic: record
                                    });
                                });
                        }
                    })
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

topicRouter.delete('/:id', checkAuth, verifyAdminOrAuthorTopic, (req, res, next) => {
    const id = req.params.id;
    topicModel.findByIdAndRemove(id)
        .then((resold) => {
            res.status(201).json({
                topic: resold
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = topicRouter;
