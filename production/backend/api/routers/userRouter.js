const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../../mongoDB/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {checkAuthAdmin, ADMIN_JWT_KEY} = require('../middlewares/checkAuthAdmin');
const {checkAuthUser, USER_JWT_KEY} = require('../middlewares/checkAuth');

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
    userModel.find()
        .then((records) => {
            const users = records.map((user) => {
                return {
                    _id: user._id,
                    nick: user.nick,
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
    userModel.find()
        .then((record) => {
            const admin = record && !record.length;
            userModel.findOne({email: req.body.email})
                .then((recordE) => {
                    userModel.findOne({email: req.body.email})
                        .then((recordN) => {
                            if(recordE || recordN) {
                                res.status(409).json({message: 'nick or email exist'})
                            } else {
                                bcryptjs.hash(req.body.password, 10, (err, hash) => {
                                    if(err) {
                                        res.status(500).json({error: err});
                                    } else {
                                        console.log(admin);
                                        const user = new userModel({
                                            _id: new mongoose.Types.ObjectId(),
                                            nick: req.body.nick,
                                            email: req.body.email,
                                            password: hash,
                                            admin: admin,
                                            date: new Date().getTime()
                                        });
                                        user.save()
                                            .then((record) => {
                                                res.status(201).json({message: 'user was sign up'});
                                            })
                                    }
                                });
                            }
                        })
                })
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
                                nick: record.nick,
                                userId: record._id,
                                admin: record.admin
                            },
                            USER_JWT_KEY,
                            {
                                expiresIn: '1h'
                            }
                        );
                        res.status(201).json({
                            user: {
                                _id: record._id,
                                nick: record.nick,
                                email: record.email,
                                date: record.date,
                                admin: record.admin,
                                token: token
                            },
                            message: 'login'
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

