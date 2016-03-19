var mongoose = require('mongoose');
var random   = require('mongoose-simple-random');

var WordSchema = new mongoose.Schema({
    name       : String,
    highscore  : { type: Number, min: 0, default: 0 },
    updated_at : { type: Date, default: Date.now },
});
WordSchema.plugin(random);

WordSchema.pre('save', function(next) {
    // Calculate the highscore with floor(1.95^(n/3)) [n is the numberof characters in the	word]
    // this.highscore = Math.floor(
    //     Math.pow(1.95, (this.name.length/3))
    // );

    // Calculate the highscore with floor(5.25^(n/3)) [n is the numberof characters in the	word]
    this.highscore = Math.floor(
        Math.pow(1.95, this.name.length)
    );

    next();
});

module.exports = mongoose.model('Word', WordSchema);
