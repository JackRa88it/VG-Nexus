// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var express = require("express");
var router = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated");

// ====================================================================
// SEQUELIZE TEMPLATES
// ====================================================================
// create new user (use primary ID from req.params to associate w/ other records)
router.get("/api/testcreate", function(req, res) {
  console.log(req.body);
  db.User.create({
    username: 'testerthethird',
    email: 'thirdtimesthecharm@test.com',
    password: 'test',
    bio: "call me cuties",
    postBanner: "backend makes ma back bend"
  }).then(function(user) {
    console.log(user);
    res.json(user);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});


// update existing record
router.get("/api/testupdate", function(req, res) {
  console.log(req.body);
  db.User.update({
    username: 'updatetestman1'
  },
  {where: {id: 1}}
  ).then(function(update) {
    console.log(update);
    res.json(update);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});

// find record(s)
router.get("/api/testfindall", function(req, res) {
  console.log(req.body);
  db.User.findAll({
    where: {id: 2}
  }
  ).then(function(found) {
    console.log(found);
    res.json(found);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});

// find associated records
router.get("/api/testgetassociated", function(req, res) {
  db.User.findOne({
    where: {id: 1}
  }).then(function(user) {
    user.getCollectives().then(function(data) {
      res.json(data);
    });
  });
});

// find record and associated records together
router.get("/api/testfindbothrelated", function(req, res) {
  db.User.findAll({
    where: {id: 2},
    include: [db.Game]
  }
  ).then(function(found) {
    console.log(found);
    res.json(found);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
  });
});


// create record and associated record in one step (probably unnecessary)
router.get("/api/usermedia", function(req, res) {
  console.log(req.body);
  db.User.update({
    username: 'testman2',
    Media: [
      {
        title: "testmedia2"
      }
    ]
  },
  {where: { id: 2}}, 
  {
    include: [ db.Media ]
  }
  ).then(function(data) {
    console.log(data);
    res.json(data);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});

// create record, then associate w existing record through join table
router.get("/api/testjoin", function(req, res) {
  // var userID = req.user.id
  db.User.findOne({
    id: 1
  }).then(function(user) {
    user.addFriend(2);
    res.end();
  });
});
// ====================================================================
module.exports = router;