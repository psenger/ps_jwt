var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('./services/jwt.js');
var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,HEAD,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.post('/register', function(req, res) {
    var user = req.body;
    var newUser = new User.model({
        email: user.email,
        password: user.password
    });
    newUser.save(function(err, savedUser) {
        //res.status(200).json(newUser);
        var payload = {
            iss: req.hostname,
            sub: savedUser.id // ._id is the MongoDB Object, while .id is the string literal
        };
        var token = jwt.encode(payload, "shh..");
        res.status(200).send({
            user: savedUser.toJSON(),
            token: token
        });
    });
});
var jobs = [
    'Cook',
    'Super Hero',
    'Unicorn Wisperer',
    'Toast Inspector'
];
app.get('/jobs', function(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'you are not authorized'
        });
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "shh..");
    if (!payload.sub) {
        res.status(401).send({
            message: 'Authentication failed'
        });
    }
    res.json(jobs);
});
mongoose.connect("mongodb://192.168.33.10:27017/psjwt");
var server = app.listen(3000, function() {
    console.log("up at ", server.address().port);
});