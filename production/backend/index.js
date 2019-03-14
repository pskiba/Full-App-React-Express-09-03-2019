const app = require('./app');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/app09032019', { useNewUrlParser: true });


// const password = 'atlas521run';
// mongoose.connect('mongodb://pskiba:' + password + '@cluster-full-stack-1-shard-00-00-1chae.mongodb.net:27017,cluster-full-stack-1-shard-00-01-1chae.mongodb.net:27017,cluster-full-stack-1-shard-00-02-1chae.mongodb.net:27017/test?ssl=true&replicaSet=Cluster-full-stack-1-shard-0&authSource=admin&retryWrites=true',
//     { useNewUrlParser: true }
// );


app.listen('3000', () => {console.log('server')});
