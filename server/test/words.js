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
                res.body.should.be.an.instanceOf(Array);
                for (var i=0; i < res.body.length; i++){
                    res.body[i].should.have.property('_id');
                    res.body[i].should.have.property('name');
                    res.body[i].should.have.property('highscore');
                }
                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should return a json word randomly', function(done) {
            request(config.url)
            .get('/words/random')
            .expect('Content-Type', /json/)
            .expect(200) //Status code
            .end(function(err, res) {
                res.body.should.have.property('name');
                res.body.should.have.property('highscore');
                res.body.should.have.property('shuffle');

                if (err) {
                    throw err;
                }
                done();
            });
        });
    });
});
