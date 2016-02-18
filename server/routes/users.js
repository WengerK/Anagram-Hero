var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');

// bodyParser middleware
var bodyParser = require('body-parser');
// support json encoded bodies
router.use(bodyParser.json());
// support encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));


/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* GET /user/name */
router.get('/:name', function(req, res, next) {
    User.find({ 'name': req.params.name }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* POST /users */
router.post('/', function(req, res, next) {
    // @TODO Check user already exist
    User.create({'name': req.body.name}, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /users/:name */
router.put('/:name', function(req, res, next) {
    User.update({ 'name': req.params.name }, {'hightscore': req.body.hightscore}, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
