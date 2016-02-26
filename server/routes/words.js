var express = require('express');
var router = express.Router();

var mongoose  = require('mongoose');
var Word      = require('../models/Word.js');

/* GET words listing. */
router.get('/', function(req, res, next) {
    Word.find(function (err, words) {
        if (err) return next(err);
        res.json(words);
    });
});

/* GET word */
router.get('/random', function(req, res, next) {

    // Find a single random document
    Word.findOneRandom(function(err, word) {
        if (err) return next(err);

        // Word to lower
        word.name = word.name.toLowerCase();

        // Shuffle the word in live
        word.shuffle = word.name.split('').sort(function(){return 0.5-Math.random()}).join('');

        // Format return data
        res.json({
            'name'     : word.name,
            'highscore': word.highscore,
            'shuffle'  : word.shuffle
        });
    });
});

module.exports = router;
