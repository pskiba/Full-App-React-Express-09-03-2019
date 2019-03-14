const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../../mongoDB/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {checkAuthAdmin, JWT_KEY} = require('../middlewares/checkAuthAdmin');

const userRouter = express.Router();

userRouter.get('/', checkAuthAdmin, (req, res, next) => {
    userModel.find()
        .then((records) => {
            const users = records.map((user) => {
                return {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    date: user.date
                };
            });
            res.status(200).json({users: users})
        })
        .catch((err) => {
            res.status(500).json({error: err});
        })
});

userRouter.get('/:id', checkAuthAdmin,  (req, res, next) => {
    const id = req.params.id;
    userModel.findById(id)
        .then((record) => {
            if(record) {
                delete record.password;
                res.status(200).json({user: record});
            } else {
                res.status(404).json({message: 'no found'});
            }
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

userRouter.post('/signup', (req, res, next) => {
    userModel.findOne({email: req.body.email})
        .then((record) => {
            if(record) {
                res.status(409).json({message: 'login exist'})
            } else {

                bcryptjs.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else {
                        const user = new userModel({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
                            date: new Date()
                        });
                        user.save()
                            .then((record) => {
                                res.status(201).json({message: 'user was sign up'});
                            })
                    }
                });
            }
        })
        .catch((err) => {
            res.status(500).json({error: err})
        });
});

userRouter.post('/login', (req, res, next) => {

    userModel.findOne({email: req.body.email})
        .then((record) => {
            if(!record) {
                res.status(404).json({message: 'bed login or password'})
            } else {
                bcryptjs.compare(req.body.password, record.password, (err, isEqual) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else if(!isEqual) {
                        res.status(404).json({message: 'bed login or password'});
                    } else {
                        const token = jwt.sign(
                            {
                                email: record.email,
                                userId: record._id
                            },
                            JWT_KEY,
                            {
                                expiresIn: '1h'
                            }
                        );
                        res.status(201).json({
                            user: {
                                _id: record._id,
                                firstName: record.firstName,
                                lastName: record.lastName,
                                email: record.email,
                                date: record.date,
                                token: token
                            }
                        });
                    }
                });
            }
        });
});

userRouter.delete('/:id', checkAuthAdmin, (req, res, next) => {
    const id = req.params.id;
    userModel.findByIdAndRemove(id)
        .then((record) => {
            res.status(201).json({message: 'user was removed'});
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

module.exports = userRouter;

