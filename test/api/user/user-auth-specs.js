"use strict";
process.env.NODE_ENV = 'test';

var chai = require('../../helper/setup-chai')
  , status = require('../../../lib/server/status')
  , request = require('supertest-session')('http://localhost:3001')
  ;

describe('User API Auth', () => {

  describe('#access without token', () => {
    it('should not permit access to generateResetToken for user without a valid access token', (done) => {
      request
        .get('/api/v1/users/11bc6f7b9b0d0b0457673daf')
        .send({})
        .expect(200)
        .end((err, res) => {
          res.body.status.should.be.equal(status.codes.UserAuthRequired.code);
          done();
        });
    });
  });

  describe('#login', () => {

    it('should not allow users with wrong password to get token', (done) => {
      request
        .post('/api/v1/users/login')
        .send({
          email: 'test@test.com',
          password: 'definitelywrongpassword'
        })
        .expect(500)
        .end((err, res) => {
          res.body.status.should.be.equal(status.codes.UserCredentialsNotMatch.code);
          res.body.value.message.should.exist;
          done();
        });
    });

    it('should allow users to login', (done) => {
      request
        .post('/api/v1/users/login')
        .send({
          email: 'test@test.com',
          password: 'test'
        })
        .expect(200)
        .end((err, res) => {
          res.body.status.should.be.equal(0);
          done();
        });
    });


  });

  describe('#access with token', () => {
    it('should allow access to generateResetToken', (done) => {
      request
        .get('/api/v1/users/11bc6f7b9b0d0b0457673daf')
        .send({})
        .expect(200)
        .end((err, res) => {
          res.body.status.should.be.equal(0);
          done();
        });
    });
  });

  describe('#token refresh', () => {
    it('should refresh access token and keep access to generateResetToken', (done) => {

      // wait till access token gets invalidated

      request
        .get('/api/v1/users/11bc6f7b9b0d0b0457673daf')
        .send({})
        .expect(200)
        .end((err, res) => {
          res.body.status.should.be.equal(0);
          done();
        });
    });
  });

  describe('#logout', () => {
    it('should allow users to logout and invalidate access token and refresh token', (done) => {

      request
        .post('/api/v1/users/logout')
        .expect(200)
        .end((err, res) => {
          res.body.status.should.be.equal(0);
          done();
          // test for invalidating session
        });
    });


    it('should do nothing when non-logged-in user tries to logout but notify client', (done) => {

      request
        .post('/api/v1/users/logout')
        .expect(500)
        .end((err, res) => {
          res.body.status.should.be.equal(status.codes.UserLoggingOutWhenNotLoggedIn.code);
          done();
        });
    });
  });

});
