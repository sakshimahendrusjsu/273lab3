//import the require dependencies
const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require("mongoose");
const db = require("./config/settings").mongoUri;
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");

console.log(db);
//Coonect to Mongo DB
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('debug', true);
mongoose
  .connect(db,{ useNewUrlParser: true, poolSize: 0 })
  .then(() => console.log("connected to mongo db"))
  .catch(err => console.log(err));

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//use express session to maintain session data
app.use(session({
  secret: 'cmpe273_grubhub_react_mysql_express',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


// Set up middleware
app.use(passport.initialize());

// app.use(function (req, res) {
//   req.base = `${req.protocol}://${req.get('host')}`
//   console.log("URL::",req.base);
//    res.status(404).send("Sorry can't find that!")
// })


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!!');
});

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true // Dev GUI for GraphQL
  })
);

// app.post('/upload',upload);
//start your server on port 3005
app.listen(3001);
console.log("Server Listening on port 3001");

module.exports=app;