const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../../mongoDB/userModel');
const bscript = require('bscript');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'secret';

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
    userModel.find()
        .then((records) => {
            const users = records.map((user) => {
                delete user.password;
                return {...user};
            });
            res.status(200).json({users: users})
        })
        .catch((err) => {
            res.status(500).json({error: err});
        })
});

userRouter.get('/:id', (req, res, next) => {
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
                res.status(500).json({message: 'login exist'})
            } else {
                bscript.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else {
                        const user = userModel({
                            ...req.body,
                            password: hash,
                            _id: new mongoose.Types.ObjectId(),
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
                bscript.compare(req.body.password, record.body.password, (err, isEqual) => {
                    if(err) {
                        res.status(500).json({error: err});
                    } else if(isEqual) {
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
                        delete record.password;
                        res.status(201).json({
                            user: {...record, token}
                        })
                    }
                })
            }
        })
});

userRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    userRouter.findByIdAndRemove(id)
        .then((record) => {
            res.status(201).json({message: 'user was removed'});
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

module.exports = userRouter;

