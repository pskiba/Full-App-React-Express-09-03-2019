const express = require('express');
const mongoose = require('mongoose');
const postModel = require('../../mongoDB/postModel');

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
    const post = new postModel({
        ...req.body,
        _id: new mongoose.Types.ObjectId,
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

postRouter.patch('/:id', (req, res, next) => {
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

postRouter.delete('/:id', (req, res, next) => {
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