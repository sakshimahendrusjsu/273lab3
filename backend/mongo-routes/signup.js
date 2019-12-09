const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/settings");
const passport = require("passport");

//Load user Model
const User = require("../models/UserSchema");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.post("/signup",(req,res)=>{
  console.log("/signup-mongo",req.body);
  User.findOne({$and:[{email:req.body.email},{user_type:req.body.type}]}).then(user=>{
      if(user){
        res.status(401).send({
          output:true,
          message:"Email Id already exists!!"}) 
      }else{
          //create a new user
          const newUser= new User({
              firstName: req.body.first,
              lastName: req.body.last,
              email: req.body.email,
              pswd: req.body.password,
              user_type: req.body.type,
              restaurant_name: req.body.restaurant_name ? req.body.restaurant_name: null,
              phone: req.body.phone ? req.body.phone :null,
              zipcode: req.body.zipcode ? req.body.zipcode : null,
              image : null
          })
        //hash the password
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.pswd,salt,(err,hash)=>{
                if (err) throw err;
          newUser.pswd = hash;
          newUser
            .save()
            .then(user =>  
              res.status(200).send({
              output:true,
              message:"Account Successfully Created!!"})
            )
            .catch(err => console.log(err));
            });
        });
      }
  });
});

module.exports = router;