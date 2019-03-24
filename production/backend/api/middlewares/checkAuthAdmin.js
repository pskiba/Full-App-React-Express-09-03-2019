const jwt = require('jsonwebtoken');
const JWT_KEY = 'adminKeyToken';
const checkAuthAdmin = (req, res, next) => {
    try {
        const token = req.headers.Authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_KEY);
        req.userData = decoded;
        next();
    } catch(err) {
        res.status(401).json({message: 'Auth failed'});
    }
};

module.exports = {
    checkAuthAdmin: checkAuthAdmin,
    ADMIN_JWT_KEY: JWT_KEY
};
