const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/settings");

//Load user Model
const User = require("../models/UserSchema");

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  console.log("/login-mongo",req.body);
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ 'email':email,'user_type':req.body.type }).then(user => {
      // Check for user
      if (!user) {
        error = "Hey Stranger! We don't recognize that login. Spell check your info and try again!";
        console.log(error);
        return res.status(404).send({
          "output" : false,
          "message" :error });
      } 
      // Check Password
      console.log("checking password");
      bcrypt.compare(password, user.pswd).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = {
            email: user.email,
            user:user,
            id: user.id,
            type: user.user_type
          };
          console.log("create jwt token");
           // Create JWT Payload
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
            console.log("token",token);
            res.cookie('cookyou', JSON.stringify(payload), { maxAge: 9000000, httpOnly: false, path: '/' });
            res.status(200).send({
             "output" : true,
             "message" :"Successful login",
              token: "Bearer " + token,
              "user":user
              });
            });
        } else {
          error = "Password incorrect";
          console.log(error);
          return res.status(401).send({
            "output" : false,
            "message" :error });;
        }
      });
    });
  });

  module.exports = router;