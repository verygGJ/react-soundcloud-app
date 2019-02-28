const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/build'));

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

mongoClient.connect((err, database) => {
    if(err) return err;

    app.locals.collection = database.db('users').collection('users');
});

app.listen(port, () => {
    console.log('Started on port ' + port);
});

app.get('/', (req, res) => {
    res.send('index');
});

app.use('/api/user', routes.register);