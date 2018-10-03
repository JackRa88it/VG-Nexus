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

router.post("/api/login",  function(req, res) {
    var form = new formidable.IncomingForm()
    form.parse(req,function(err,fields,files){
        console.log(fields)
        res.send('success');
    })
  });


router.post("/api/signup",passport.authenticate("local"), function(req, res) {
    var form = new formidable.IncomingForm()
    form.parse(req,function(err,fields,files){
        console.log(fields)
        db.User.create({
            email: fields.email,
            password: fields.password
          }).then(function() {
            res.send('success!');
          }).catch(function(err) {
            console.log(err);
            res.json(err);
          });
    })
   
});

module.exports = router;