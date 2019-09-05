const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./Week7lab.js');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json())
app.use(express.static('public'));
app.use(express.static('images'));


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', router);
app.listen("8080");
console.log("Server running at http://localhost:8080");