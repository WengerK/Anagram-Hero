var express = require('express');

var mongoose = require('mongoose');
var Word = require('../models/Word.js');

module.exports = {
    seed: function(){
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
                Word.create({ name: 'White' });
                Word.create({ name: 'House' });
                Word.create({ name: 'Flower' });
                Word.create({ name: 'Iphone' });
                Word.create({ name: 'Door' });
                Word.create({ name: 'Cover' });
                Word.create({ name: 'Chair' });
                Word.create({ name: 'Air' });
                Word.create({ name: 'Hand' });
                Word.create({ name: 'Head' });
                Word.create({ name: 'Web' });
                Word.create({ name: 'Digital' });
                Word.create({ name: 'Company' });
                Word.create({ name: 'Blue' });
                Word.create({ name: 'Swiss' });
                Word.create({ name: 'Game' });
                Word.create({ name: 'Anagram' });
                Word.create({ name: 'Hero' });
                Word.create({ name: 'Cube' });
                Word.create({ name: 'Ball' });
                Word.create({ name: 'Pie' });
                Word.create({ name: 'The' });
                Word.create({ name: 'Cafee' });
                Word.create({ name: 'Bar' });
                Word.create({ name: 'Beer' });
                Word.create({ name: 'Wine' });
                Word.create({ name: 'Honey' });
                Word.create({ name: 'Sandwitch' });
                Word.create({ name: 'Ghost' });
                console.log('collection Words seeded')
            }else{
                console.log('collection Words already created')
            }
        });
    },

    clean: function(){
        Word.remove({}, function(err) {
           console.log('collection Words removed')
        });
    }
}
;
