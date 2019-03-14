const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../../mongoDB/adminModel');
const {checkAuthAdmin, JWT_KEY} = require('../middlewares/checkAuthAdmin');

const adminRouter = express.Router();

adminRouter.post('/signup', (req, res, next) => {
    adminModel.find()
        .then((records) => {
            if(records.length) {
                res.status(409).json({
                    message: 'admin already exists'
                });
            } else {
                bcryptjs.hash(req.body.password, 10, (err, hash) => {
                    const admin = adminModel({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    admin.save()
                        .then((record) => {
                            res.status(201).json({
                                message: 'admin was created'
                            });
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

adminRouter.post('/login', (req, res, next) => {
    adminModel.findOne({email: req.body.email})
        .then((record) => {
            if(!record) {
                res.status(500).json({message: 'bed email or password'});
            } else {
                bcryptjs.compare(req.body.password, record.password, (err, isEqual) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else if(!isEqual) {
                        res.status(500).json({message: 'bed email or password'});
                    } else {
                        const token = jwt.sign(
                            {
                                userId: record._id,
                                email: record.email
                            },
                            JWT_KEY,
                            {
                                expiresIn: '1h'
                            }
                        );
                        res.status(201).json({
                            admin: {
                                _id: record._id,
                                email: record.email,
                                token: token
                            }
                        });
                    }
                });
            }
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

adminRouter.delete('/:id', checkAuthAdmin, (req, res, next) => {
    const id = req.params.id;
    adminModel.findByIdAndRemove(id)
        .then((record) => {
            res.status(201).json({message: 'admin removed'});
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

module.exports = adminRouter;