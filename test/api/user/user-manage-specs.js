'use strict';

process.env.NODE_ENV = 'test';

var request = require('supertest-session')('http://localhost:3001');
var chai = require('../../helper/setup-chai');
var expect = chai.expect;

describe('User API Manage', () => {
  describe('#getUser', () => {

    before((done) => {
      request
        .post('/api/v1/users/login')
        .send({
          email: 'test@test.com',
          password: 'test',
        })
        .end((err, res) => {
          done();
        });
    });

    after((done) => {
      request
        .post('/api/v1/users/logout')
        .send({})
        .end((err, res) => {
          done();
        });
    });

    it('respond with json', (done) => {
      request
        .get('/api/v1/users/' + '11bc6f7b9b0d0b0457673daf')
      //.set('Accept', 'application/json')
        .end((err, res) => {
          res.body.value.email.should.be.equal('test@test.com');
          done();
        });
    });
  });
});

