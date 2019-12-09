const express = require('express');
const router = express.Router();
// const buyerRoutes = require('./buyers.js');
// const ownerRoutes = require('./owners.js');
// const orderRoutes = require('./order.js');
// const loginRoutes = require('./login.js');
// const createRoutes = require('./create.js');
// const profileRoutes = require('./profile.js');
// const sectionRoutes = require('./section.js');
// const resRoutes = require('../mongo-routes/res');
// const uploadRoutes = require('./upload');

const mloginRoutes = require('../kafka-routes/login');
const msignupRoutes = require('../kafka-routes/signup');
const mprofileRoutes = require('../kafka-routes/profile');
const msectionRoutes = require('../kafka-routes/sec');
const mresRoutes = require('../kafka-routes/res');
const morderRoutes = require('../kafka-routes/order');
const mmsgRoutes = require('../kafka-routes/message')
/* GET home page. */
// router.use('/', function(req, res, next) {
//   res.send("Welcome to grubuhub application!!");
// });

// router.use("/buyer",buyerRoutes);
// router.use("/order",orderRoutes);
// router.use('/login',loginRoutes);
// router.use('/create',createRoutes);
// router.use('/profile',profileRoutes);
// router.use('/sec',sectionRoutes);
// router.use('/res',resRoutes);
// router.use('/upload',uploadRoutes)

router.use("/msignup",msignupRoutes);
router.use("/mlogin",mloginRoutes);
router.use("/mprofile",mprofileRoutes);
router.use("/msec",msectionRoutes);
router.use("/mres",mresRoutes);
router.use("/morder",morderRoutes);
router.use("/mmsg",mmsgRoutes);
module.exports = router;