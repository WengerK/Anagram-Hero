var express  = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/anagram_hero', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

// Words seeding
var seedWords = require('./seed/words');
seedWords.clean();
seedWords.seed();
