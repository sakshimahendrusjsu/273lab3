const express = require('express');
const router = express.Router();
const pool = require('../mysqlDb');
var multer = require('multer')
const path = require('path');
const Restaurants = require('../models/Restaurants')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //     cb(null, '/home/ec2-user/lab1/cmpe273-lab1/newFrontend/src/uploads')
        cb(null, '/Users/sakshi/Documents/AllCodes/React/lab2/grubHub/frontend/src/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage }).single('file')

router.post('/getAll', function (req, res) {
    console.log(req.body.id);
    console.log("/get sections/");
    var query = { 'name': req.body.name, 'email': req.body.email }
    // Find the document
    Restaurants.findOne(query, function (error, result) {
        if (error) {
            res.status(400).send({
                "output": false,
                "message": error
            })
        } else {
            console.log("result", result);
            res.status(200).send({
                output: true,
                message: result
            })
        }
    });
});

router.post('/add', function (req, res) {
    console.log(req.body);
    console.log("mongo add sections");
    var query = { 'name': req.body.restaurant_name, 'email': req.body.email },
        update = { $push: { 'sections': { 'section_name': req.body.name } } },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
    // Find the document
    Restaurants.update(query, update, options, function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send({
                "output": false,
                "message": error
            })
        } else {
            res.status(200).send({
                output: true,
                message: "Section Added Successfully!!"
            })
        }
    });
});


router.post('/del', function (req, res) {
    console.log(req.body);
    console.log("mongo /delete section/");
    var query = { 'name': req.body.name, 'email': req.body.email },
        update = { $pull: { section_name: req.body.section_name } }
    // Find the document
    Restaurants.findOneAndDelete(query, update, function (error, result) {
        if (error) {
            res.status(400).send({
                "output": false,
                "message": error
            })
        } else {
            res.status(200).send({
                output: true,
                message: "Section deleted Successfully!!"
            })
        }
    });
});


router.post('/insertItem', function (req, res) {
    upload(req, res, function (error) {
        if (error instanceof multer.MulterError) {
            console.log("multer error", error)
        } else if (error) {
            console.log("error", error)
        }
        console.log("mongo /insertItem/");
        console.log(req.body);
        console.log(req.file);
        let item = {
            "name": req.body.name,
            "description": req.body.description,
            "price": req.body.price,
            "cuisine": req.body.cuisine,
            "image": req.file.filename
        }
        var query = { 'name': req.body.restaurant_name, 'email': req.body.email, 'sections._id': req.body.section_id },
        update = { $push: {'sections.$.items': item}}
        Restaurants.update(query, update, function (error, result) {
            if (error) {
                console.log(error);
                res.status(400).send({
                    "output": false,
                    "message": error
                })
            } else {
                res.status(200).send({
                    output: true,
                    message: "Item added Successfully !!"
                })
            }
        });
     });
});


router.post('/delItem', function (req, res) {
    console.log(req.body);
     console.log("mongo /delItem/");
     let item_id = req.body.product.items._id;
     console.log(item_id)
     var query = { 'name': req.body.restaurant_name, 'email': req.body.email, 'sections._id': req.body.product.section_id },
        update = { $pull: {'sections.$.items._id': item_id}}
        Restaurants.update(query, update, function (error, result) {
            if (error) {
                console.log(error);
                res.status(400).send({
                    "output": false,
                    "message": error
                })
            } else {
                res.status(200).send({
                    output: true,
                    message: "Item Deleted!!"
                })
            }
        });
     });


//  router.post('/selectRestuarantItemsBySection', function (req, res) {
//     console.log(req.body);
//     console.log("/selectRestuarantItemsBySection/");
//     query = constants.QUERY.selectRestuarantItemsBySection;
//     console.log(query);
//     pool.query(query,req.body.id, function (err, result) {
//         if (err) {
//             console.log("error", err);
//             res.send(500, {
//                 "output": false,
//                 "message": "Err in query" + err
//             })
//         }
//         if (result.length >= 1) {
//             console.log(result);

//             res.send(200, {
//                 output: true,
//                 message: result
//             })
//             console.log("Result!!");
//         }
//         else {
//             res.send(203, {
//                 "output": false,
//                 "message": result
//             });
//         }
//     });
// });


module.exports = router;
