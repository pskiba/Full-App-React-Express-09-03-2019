const express = require('express');
const mongoose = require('mongoose');
const postModel = require('../../mongoDB/postModel');
const {checkAuth} = require('../middlewares/checkAuth');

const postRouter = express.Router();

postRouter.get('/', checkAuth, (req, res, next) => {
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

postRouter.get('/:id', checkAuth, (req, res, next) => {
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

postRouter.post('/', checkAuth, (req, res, next) => {
    const post = new postModel({
        _id: new mongoose.Types.ObjectId,
        authorId: req.body.authorId,
        title: req.body.title,
        content: req.body.content,
        date: new Date()
    });
    post.save()
        .then((record) => {
            res.status(201).json({
                post: record
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        });
});

postRouter.patch('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    const toUpdate = req.body;
    postModel.update({_id: id}, {$set: toUpdate})
        .then((record) => {
            res.status(201).json({
                post: record
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

postRouter.delete('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    postModel.findById(id)
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