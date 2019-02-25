const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8000;

app.use(express.static(__dirname + '/build'));

app.listen(port, () => {
    console.log('Update on ' + port);
});

app.post('/api/user/login/', (req, res) => {
    res.send('connect with react on login');
});