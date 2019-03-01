const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 8000;
const routes = require('./routes');

mongoose.connect('mongodb://localhost:27017/soundcloud', { useCreateIndex: true, useNewUrlParser: true });

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