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
router.get('/list', function(req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* GET /user/name */
router.get('/:name', function(req, res, next) {
    User.findOne({ 'name': req.params.name }, function (err, user) {
        if (err) return next(err);

        if( user !== null ){
            // Return the existing user
            res.json(user);
        }else {
            // Create the new user and return it
            User.create({'name': req.params.name}, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        }
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

/* PUT /users/highscore/:name */
router.put('/highscore/:name', function(req, res, next) {
    User.findOne({ 'name': req.params.name }, function (err, user) {
        if (err) return next(err);

        if( user !== null && req.body.highscore > user.highscore ){
            // If the user exist, check it's a new highscore and save it
            User.update({ 'name': req.params.name }, {'highscore': req.body.highscore}, function (err, put) {
                if (err) return next(err);
                res.json(put);
            });
        }else{
            res.json({'ok':'0'});
        }
    });
});

module.exports = router;
