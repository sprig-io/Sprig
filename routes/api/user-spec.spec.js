const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
const User = require('../../models/User');

describe('User routes', () => {
  describe('user', function() {
    it('should be invalid if name is empty', function(done) {
      let newUser = new User();

      newUser.validate(function(err) {
        expect(err.errors.name.name).to.equal('ValidatorError');
        done();
      });
    });
    it('should be invalid if email is not an email', function(done) {
      const newUser = new User({
        name: 'TestName',
        email: null,
        password: '123456',
        password2: '123456',
      });

      newUser.validate(function(err) {
        expect(err.errors.email.message).to.equal('Path `email` is required.');
        done();
      });
    });
    it('should be invalid if password is null', function(done) {
      const newUser = new User({
        name: 'TestName',
        email: 'test@test.com',
        password: null,
        password2: null,
      });

      newUser.validate(function(err) {
        expect(err.errors.password.message).to.equal(
          'Path `password` is required.'
        );
        done();
      });
    });
  });
});
