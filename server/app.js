var express      = require('express');
// var path         = require('path');
// var favicon      = require('serve-favicon');
// var logger       = require('morgan');
// var cookieParser = require('cookie-parser');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/anagram_hero', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var users = require('./routes/users');
// var users = require('./routes/users');

var app = express();
// app.use('/', routes);
app.use('/users', users);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
