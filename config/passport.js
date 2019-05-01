const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
const passport = require('passport');

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const foundUser = await User.findById(jwtPayload.id);
      if (foundUser) {
        return done(null, foundUser);
      }
      return done(null, false);
    } catch (error) {
      console.error(error);
    }
  })
);

module.exports = passport;
