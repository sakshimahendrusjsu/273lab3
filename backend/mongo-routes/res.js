const express = require('express');
const router = express.Router();
const Restaurants = require('../models/Restaurants')


router.post('/selectRestuarantByItems', function (req, res) {
    console.log(req.body);
     text = req.body.text;
     console.log(text);
     console.log("/selectRestuarantByItems/");
     var query = {'sections.items.name':{$regex: ".*" + req.body.text + ".*"}}
      // Find the document
     Restaurants.find(query, function(error, result) {
             if(error){
            res.status(400).send({
                "output" : false,
                "message" : error })
           }else{
               console.log(result);
            res.status(200).send({
                output: true,
                message: result})
           }
    });
 });
 
 
 router.post('/selectRestuarantByItemsAndCuisine', function (req, res) {
     console.log(req.body);
     text = req.body.text;
     console.log(text);
     cuisine = req.body.cuisine;
     console.log(cuisine);
     console.log("/selectRestuarantByItemsAndCuisine/");
     var query = { $and: [{'sections.items.name':{$regex: ".*" + req.body.text + ".*"},'sections.items.cuisine':{$regex: ".*" + req.body.text + ".*"}}]}
     // Find the document
    Restaurants.find(query, function(error, result) {
            if(error){
           res.status(400).send({
               "output" : false,
               "message" : error })
          }else{
           res.status(200).send({
               output: true,
               message: result})
          }
   });
 });

 module.exports = router;