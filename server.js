const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 8000;
const routes = require('./routes');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const SESSION_SECRET = 'r8Vn5jEtU7cGw1RIN36LRxssCnCwgTsmrcP2LRMbwP2';

mongoose.connect('mongodb://localhost:27017/soundcloud', { useCreateIndex: true, useNewUrlParser: true });

app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/build'));

app.listen(port, () => {
    console.log('Started on port ' + port);
});

app.get('/', (req, res) => {
    res.send('index');
});

app.use('/api/user', routes.auth);