const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require("express").Router();
const path = require('path')

// var passport = require("./config/passport");
// var db = require("./models");
// var session = require("express-session");
require('dotenv').config()
var http = require('http').Server(app);
var io = require('socket.io')(http);





// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)


// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());


const router = require("./routes/api-routes.js")(io)
routes.use('/',router)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
else{
  app.use(express.static("client/public/"));
}
app.use(routes)
// Start the API server

router.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// db.sequelize.sync().then(function(){
    app.listen(PORT, function() {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
      });
// })

