var db = require("../models");
var passport = require("../config/passport");
var express = require("express");
var router = express.Router();
var formidable = require('formidable');
const path = require('path')
var fs = require('fs')
var extract = require('extract-zip')


router.post('/upload',function(req,res){
        //Initialize an empty form
        var form = new formidable.IncomingForm()
        form.maxFileSize = Math.pow(1024,3)
        form.parse(req,function(err,fields,files){
            console.log(fields)
            if(err) throw err;
            //fields are any values that are not files that were sent with the form whose keys are the name of the input
            //Grab the path of the file that was just uploaded "filetoupload" is the name of the input on the frontend
            var oldpath = files.filetoupload.path;
            console.log(files.thumbnail.path)
            //Create a newpath to store the file at
            var newpath = __dirname + "/" + files.filetoupload.name

            fs.rename(oldpath, newpath, function (err) {
                console.log('renaming filepaths')
                if (err) throw err;

                //Create a directory if it doesn't already exist
                var dir = "./client/public/user"
                if (!fs.existsSync(dir)){
                    console.log('path does not exist \n creating newpath')
                    fs.mkdirSync(dir);
                }

                //Unzip the file to target directory
                var target = path.join(__dirname,'../client/public/user/')
                extract(newpath,{dir:target},function(err){
                    console.log('extracting to ', target)
                    if(err) throw err;
                    fs.unlink(newpath, (err) => {
                        if (err) throw err;
                        console.log('deleting' + newpath );
                        //Send the URL to the games new path
                        res.send('/game');
                    });
                })
            });
        })
    
})

router.post("/api/login", passport.authenticate("local"), function(req, res) {
    console.log(req.user.id)
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    var id = req.user.id;
    res.send('success');
  });


router.post("/api/signup", function(req, res) {
    var form = new formidable.IncomingForm()
    form.parse(req,function(err,fields,files){
        console.log(fields)
        db.User.create({
            username: fields.email,
            email: fields.password,
            password: req.body.password
          }).then(function() {
            res.send('successful');
          }).catch(function(err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
          });
    })
   
});

module.exports = router;