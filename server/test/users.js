var config = require('../config');
var request = require('supertest');

describe('Routing', function() {
    describe('Users', function() {

        it('should return a json list of accounts', function(done) {
            request(config.url)
            .get('/users/list')
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
        
        it('should return a json corresponding of account', function(done) {
            request(config.url)
            .get('/users/sudei')
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

        it('should return a json when account hightscore has been saved', function(done) {
            var highscore = {
                highscore: 300,
            };
            request(config.url)
            .put('/users/highscore/sudei')
            .send(highscore)
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
