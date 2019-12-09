const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require("../models/UserSchema");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, '/home/ec2-user/lab1/cmpe273-lab1/newFrontend/src/uploads')
},
filename: function (req, file, cb) {
  cb(null, file.originalname )
}
})

var upload = multer({ storage: storage }).single('file')

 router.put('/editName', function (req, res) {
    console.log("Inside mongo edit Name Put Request");
    console.log("Req Body : ", req.body);
    let { first,last,email,type } = req.body;
    console.log(first,last,email);
   Users.findOneAndUpdate({'email':email,'user_type':type},{$set : {'firstName':first,'lastName':lastName}},function(err,result){
       if(err){
        res.status(400).send({
            "output" : false,
            "message" : err })
       }else{
        res.status(200).send({
            "output" : true,
            "message" :"Name Updated!!!!!" })
       }
   });
  });
  
  router.put('/editEmail', function (req, res) {
    console.log("Inside mongo Email Put Request");
    console.log("Req Body : ", req.body);
    let { newEmail,email,type } = req.body;
    Users.findOneAndUpdate({'email':email,'user_type':type},{$set : {'email':newEmail}},function(err,result){
        if(err){
         res.status(400).send({
             "output" : false,
             "message" : err })
        }else{
         res.status(200).send({
             "output" : true,
             "message" :"Email Id Updated!!!!!" })
        }
    });
  });
  
router.put('/editPhone', function (req, res) {
    console.log("Inside mongo Phone Put Request");
    console.log("Req Body : ", req.body);
    let { phone,email,type } = req.body;
    Users.findOneAndUpdate({'email':email,'user_type':type},{$set : {'phone':phone}},function(err,result){
        if(err){
         res.status(400).send({
             "output" : false,
             "message" : err })
        }else{
         res.status(200).send({
             "output" : true,
             "message" :"Phone Number Updated!!" })
        }
    });
  });
  
router.put('/editRestaurantName', function (req, res) {
    console.log("Inside mongo Login Post Request");
    console.log("Req Body : ", req.body);
    let { restaurantName,email,type } = req.body;
    Users.findOneAndUpdate({'email':email,'user_type':type},{$set : {'restaurant_name':restaurantName}},function(err,result){
        if(err){
         res.status(400).send({
             "output" : false,
             "message" : err })
        }else{
         res.status(200).send({
             "output" : true,
             "message" :"Restaurant Name Updated!!"})
        }
    });
  });
  
  router.put('/editCuisine', function (req, res) {
    console.log("Inside mongo Login Post Request");
    console.log("Req Body : ", req.body);
    let { cuisine,email,type } = req.body;
    Users.findOneAndUpdate({'email':email,'user_type':type},{$set : {'cuisine':cuisine}},function(err,result){
        if(err){
         res.status(400).send({
             "output" : false,
             "message" : err })
        }else{
         res.status(200).send({
             "output" : true,
             "message" :"Cuisine Updated!!"})
        }
    });
  });

router.post('/fileUpload', function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log("multer error",err)
      } else if (err) {
        console.log("error",err)
      }
//   console.log(req.file);
//   console.log("/insertItem/");
//   let path=req.file.filename
//   console.log()
//   if(req.body.type == 'buyer'){
//     query = constants.QUERY.uploadImageBuyer
//   }else{
//     query = constants.QUERY.uploadImageOwner
//   }
//   pool.query(query,[path,req.body.id], function (err, result) {
//       if (err) {
//           console.log("error", err);
//           res.send(500, {
//               "output": false,
//               "message": "Err in query"+err
//           })
//       }
//       console.log("result")
//       if (result) {
//           res.send(200, {
//               output: true,
//               message: "Item added Successfully !!"
//           })
//           console.log("Item added Successfully");
//       }
//       else {
//           res.send(203, {
//               "output": false,
//               "message": "No data found in db..." + err
//           });
//       }
//   });
 });
});

router.post('/getAll', function (req, res) {
  console.log("Inside mongo get all details Request");
  console.log("Req Body : ", req.body);
  console.log(req.cookies);
  let { type,email } = req.body;
  Users.find({'email':email,'user_type':type},function(err,result){
    if(err){
     res.status(400).send({
         "output" : false,
         "message" : err })
    }else{
     res.status(200).send({
         "result" : result,
         })
    }
});
});

  module.exports = router;