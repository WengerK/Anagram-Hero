var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    name       : {
        type: String,
        unique: true,
        required: [true, 'Username is required']
    },
    highscore  : { type: Number, min: 0, default: 0 },
    updated_at : { type: Date, default: Date.now },
});

// Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
