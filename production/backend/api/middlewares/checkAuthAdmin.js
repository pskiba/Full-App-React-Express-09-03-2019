const jwt = require('jsonwebtoken');
const JWT_KEY = 'adminKeyToken';
const checkAuthAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_KEY);
        req.userData = decoded;
        next();
    } catch(err) {
        res.status(401).json({message: 'Auth failed'});
    }
};

module.exports = {
    checkAuthAdmin: checkAuthAdmin,
    JWT_KEY: JWT_KEY
};
