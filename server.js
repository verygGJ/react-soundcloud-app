const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8000;
const routes = require('./routes');

app.use(express.static(__dirname + '/build'));

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

mongoClient.connect((err, database) => {
    if(err) return err;

    app.locals.collection = database.db('users').collection('users');
    app.listen(port, () => {
        console.log('Started on port ' + port);
    });
});

app.get('/', (req, res) => {
    res.send('index');
});

//app.get('/api/user', routes.register)