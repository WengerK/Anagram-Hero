var config = require('../config');
var request = require('supertest');
var should = require('should');

describe('Routing', function() {
    describe('Users', function() {

        it('should return a json list of accounts', function(done) {
            request(config.url)
            .get('/users/list')
            .expect('Content-Type', /json/)
            .expect(200) //Status code
            .end(function(err, res) {
                res.body.should.be.an.instanceOf(Array);
                for (var i=0; i < res.body.length; i++){
                    res.body[i].should.have.property('_id');
                    res.body[i].should.have.property('name');
                }
                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should return a json corresponding of account', function(done) {
            request(config.url)
            .get('/users/sudei')
            .expect('Content-Type', /json/)
            .expect(200) //Status code
            .end(function(err, res) {
                res.body.should.be.an.instanceOf(Object);
                res.body.should.have.property('_id');
                res.body.should.have.property('name', 'sudei');
                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should return a json corresponding of created account', function(done) {
            request(config.url)
            .post('/users')
            .send({'name': 'WengerK'})
            .expect('Content-Type', /json/)
            .expect(200) //Status code
            .end(function(err, res) {
                res.body.should.have.property('message', 'profile created');

                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should return a json error, missing parameters name', function(done) {
            request(config.url)
            .post('/users')
            .expect('Content-Type', /json/)
            .expect(500) //Status code
            .end(function(err, res) {
                res.body.should.have.property('message');
                res.body.should.have.property('errors');
                res.body.message.should.equal('Missing parameters');
                res.body.errors.should.have.property('name');

                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should return a json confirming deleted account', function(done) {
            request(config.url)
            .delete('/users')
            .send({'name': 'WengerK'})
            .expect('Content-Type', /json/)
            .expect(200) //Status code
            .end(function(err, res) {
                res.body.should.have.property('message', 'profile deleted');

                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should return a json error, missing parameters name', function(done) {
            request(config.url)
            .delete('/users')
            .expect('Content-Type', /json/)
            .expect(500) //Status code
            .end(function(err, res) {
                res.body.should.have.property('message');
                res.body.should.have.property('errors');
                res.body.message.should.equal('Missing parameters');
                res.body.errors.should.have.property('name');

                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should return a json error, the account name must be unique', function(done) {
            var account = {
                name: 'sudei',
            };
            request(config.url)
            .post('/users')
            .send(account)
            .expect('Content-Type', /json/)
            .expect(500) //Status code
            .end(function(err, res) {
                res.body.should.have.property('message');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('name', 'ValidationError');
                res.body.errors.errors.name.should.have.property('kind', 'user defined');
                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should return a json when account highscore has been saved', function(done) {
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
                done();
            });
        });

        // it('should return a json, the highscore isn\'t changed because lower than already saved highscore', function(done) {
        // });

        it('should return a json error, this username not exist', function(done) {
            var highscore = {
                highscore: 300,
            };
            request(config.url)
            .put('/users/highscore/123456')
            .send(highscore)
            .expect('Content-Type', /json/)
            .expect(500) //Status code
            .end(function(err, res) {
                res.body.should.have.property('message');
                res.body.should.have.property('errors');
                res.body.message.should.equal('User not found');
                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should return a json error, the highscore is required', function(done) {
            request(config.url)
            .put('/users/highscore/sudei')
            .expect('Content-Type', /json/)
            .expect(500) //Status code
            .end(function(err, res) {
                res.body.should.have.property('message');
                res.body.should.have.property('errors');
                res.body.message.should.equal('Missing parameters');
                res.body.errors.should.have.property('highscore');
                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should return a json error, the highscore must be an integer', function(done) {
            var highscore = {
                highscore: 'asd',
            };
            request(config.url)
            .put('/users/highscore/sudei')
            .send(highscore)
            .expect('Content-Type', /json/)
            .expect(500) //Status code
            .end(function(err, res) {
                res.body.should.have.property('message');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('name', 'CastError');
                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should return a json error, the highscore must be a positive number', function(done) {
            var highscore = {
                highscore: -3,
            };
            request(config.url)
            .put('/users/highscore/sudei')
            .send(highscore)
            .expect('Content-Type', /json/)
            .expect(500) //Status code
            .end(function(err, res) {
                res.body.should.have.property('message');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('name', 'ValidationError');
                if (err) {
                    throw err;
                }
                done();
            });
        });

    });
});
