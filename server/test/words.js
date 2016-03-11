var config = require('../config');
var request = require('supertest');

describe('Routing', function() {
    describe('Words', function() {

        it('should return a json list of words', function(done) {
            request(config.url)
            .get('/words')
            .expect('Content-Type', /json/)
            .expect(200) //Status code
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                // this is should.js syntax, very clear
                //res.should.have.status(400);
                done();
            });
        });

        it('should return a json word randomly', function(done) {
            request(config.url)
            .get('/words/random')
            .expect('Content-Type', /json/)
            .expect(200) //Status code
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                // this is should.js syntax, very clear
                //res.should.have.status(400);
                done();
            });
        });
    });
});
