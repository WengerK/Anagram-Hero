var express = require('express');

var mongoose = require('mongoose');
var Word = require('../models/Word.js');

exports.seed = function seed() {
    Word.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Word.create({ name: 'Ape' });
            Word.create({ name: 'Book' });
            Word.create({ name: 'Bison' });
            Word.create({ name: 'Paris' });
            Word.create({ name: 'Couch' });
            Word.create({ name: 'Floor' });
            Word.create({ name: 'Bee' });
            Word.create({ name: 'Barracuda' });
            Word.create({ name: 'Bern' });
            Word.create({ name: 'Mirror' });
            Word.create({ name: 'Radio' });
            Word.create({ name: 'Chest' });
            Word.create({ name: 'Pillow' });
            Word.create({ name: 'Window' });
            Word.create({ name: 'Elves' });
            Word.create({ name: 'Package' });
            Word.create({ name: 'Snowman' });
            Word.create({ name: 'Box' });
            Word.create({ name: 'Green' });
            Word.create({ name: 'Red' });
            Word.create({ name: 'Candy' });
        }
    });
}
