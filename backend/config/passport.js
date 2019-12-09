const passport = require('passport');
const mongoose = require("mongoose");
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
var config = require('./settings');
const User = mongoose.model("users");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretOrKey
  };

  const strategy = new JwtStrategy(opts,function(jwt_payload, done) {
    User.findById({id: jwt_payload.id}, function(err, user) {
        if (err) {
            console.log("to err to human",err);
            return done(err, false);
        }
        if (user) {
            console.log("rama rama",user);
            return done(null, user);
        } else {
            console.log("null user ");
            return done(null, false);
            // or you could create a new account
        }
    });
});

  passport.use(strategy);

  module.exports=passport;