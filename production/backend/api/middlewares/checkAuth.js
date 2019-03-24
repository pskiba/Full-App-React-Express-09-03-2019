const jwt = require('jsonwebtoken');
const USER_JWT_KEY = 'userKeyToken';
const postModel = require('../../mongoDB/postModel');
const topicModel = require('../../mongoDB/topicModel');

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, USER_JWT_KEY);
        req.userData = decoded;
        next();
    } catch(err) {
        res.status(401).json({message: 'Auth failed'});
    }
};

const verifyAdminOrAuthorPost = (req, res, next) => {
    const id = req.params.id;
    if(req.userData.admin) {
        next();
    } else {
        postModel.findById(id)
            .then((resold) => {
                if (resold && resold.user && resold.user.id === req.userData.userId) {
                    next();
                }
            })
    }


};

const verifyAdminOrAuthorTopic = (req, res, next) => {
    const id = req.params.id;

    if (req.userData.admin) {
        next()
    } else {
        topicModel.findById(id)
            .then((resold) => {
                if (resold && resold.user && resold.user.id === req.userData.userId) {
                    next();
                }
            })
    }

};

module.exports = {
    checkAuth: checkAuth,
    USER_JWT_KEY: USER_JWT_KEY,
    verifyAdminOrAuthorPost: verifyAdminOrAuthorPost,
    verifyAdminOrAuthorTopic: verifyAdminOrAuthorTopic
};
