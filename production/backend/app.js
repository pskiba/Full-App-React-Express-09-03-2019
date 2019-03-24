const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHttpProxy = require('express-http-proxy');

const adminRouter = require('./api/routers/adminRouter');
const userRouter = require('./api/routers/userRouter');
const postRouter = require('./api/routers/postRouter');
const topicRouter = require('./api/routers/topicRouter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/admin/', adminRouter);
app.use('/api/user/', userRouter);
app.use('/api/post/', postRouter);
app.use('/api/topic/', topicRouter);

app.use('/', expressHttpProxy('http://localhost:8080'));

// app.use('/', express.static('./dist'));


// app.get('*', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
//         if(err) {
//             res.status(500).json({error: err});
//         }
//     })
// });

app.use((req, res, next) => {
    const err = new Error('no found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err || 500).json({error: err});
});

module.exports = app;