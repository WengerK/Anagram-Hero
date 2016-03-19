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
    if (typeof req.body.name === 'undefined') return res.status(500).send({message: 'Missing parameters', errors:{'name': 'name is required'}});

    User.create({'name': req.body.name}, function (err, user) {
        if (err) return res.status(500).send({message: 'Failed to create profile.', errors: err});
        res.json({message: 'profile created'});
    });
});

/* DELETE /users */
router.delete('/', function(req, res) {
    if (typeof req.body.name === 'undefined') return res.status(500).send({message: 'Missing parameters', errors:{'name': 'name is required'}});

    User.remove({'name': req.body.name}, function (err, user) {
        if (err) return res.status(500).send({message: 'Failed to delete profile.', errors: err});
        res.json({message: 'profile deleted'});
    });
});

/* PUT /users/highscore/:name */
router.put('/highscore/:name', function(req, res, next) {
    if (typeof req.body.highscore === 'undefined') return res.status(500).send({message: 'Missing parameters', errors:{'highscore': 'highscore is required'}});

    User.findOne({ 'name': req.params.name }, function (err, user) {
        if (err) return res.status(500).send({message: 'Unattended error', errors: err});

        if (user === null) return res.status(500).send({message: 'User not found', errors: user});

        var highscore = req.body.highscore;

        // If the user exist, check it's a new highscore and save it
        User.update({ 'name': req.params.name }, {'highscore': highscore}, { runValidators: true }, function (err, put) {
            if (err) return res.status(500).send({message: 'Failed to save highscore.', errors: err});
            res.json(put);
        });

    });
});

module.exports = router;
