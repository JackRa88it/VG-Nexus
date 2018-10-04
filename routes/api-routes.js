var db = require("../models");
var passport = require("../config/passport");
var formidable = require('formidable');
const path = require('path')
var fs = require('fs')
var extract = require('extract-zip')

module.exports = function (app,io){
    io.on('connection',function(socket){
        console.log('a user connected to /');
        socket.on('newMessage', function(msg){
          console.log(msg)
          io.emit('messageBroadcast', msg);
        });
        socket.on('disconnect', function(){
          console.log('user disconnected from /');
        });
      })

    app.post('/upload',function(req,res){
        if(req.user){
            console.log(req.user)
            //Initialize an empty form
            var form = new formidable.IncomingForm()
            form.maxFileSize = Math.pow(1024,3)
            form.parse(req,function(err,fields,files){
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
                    var dir = "./client/public/" + req.user.id + '/' + fields.title
                    if (!fs.existsSync(dir)){
                        console.log('path does not exist \n creating newpath')
                        fs.mkdirSync(dir);
                    }

                    //Unzip the file to target directory
                    var target = path.join(__dirname,'../client/public/' + req.user.id + '/' + fields.name)
                    extract(newpath,{dir:target},function(err){
                        console.log('extracting to ', target)
                        if(err) throw err;
                        fs.unlink(newpath, (err) => {
                            if (err) throw err;
                            console.log('deleting' + newpath );
                            db.Game.create({
                                name: fields.name,
                                description: fields.description,
                                UserId: req.user.id,
                            }).then(function(game) {
                                console.log(game);
                                res.send('/game');
                            }).catch(function(err) {
                                console.log(err);
                                // res.status(422).json(err.errors[0].message);
                            });
                        });
                    })
                });
            })
        }  
    })

    app.get('/api/authenticate',function(req,res){
        if(req.user){
            res.status(200).send('approved')
        }
        else{
            res.status(403).send('access denied')
        }
    })

    app.post("/api/login",passport.authenticate("local"),  function(req, res) {
        res.send('/chat');
    });

    app.get("/api/logout", function(req, res) {
        req.logout();
        res.send('/')
      });


    app.post("/api/signup", function(req, res) {
        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
            postBanner: req.body.bannerUrl
          }).then(function() {
            res.redirect(307, "/api/login");
        }).catch(function(err) {
            console.log(err);
            res.send(err);
          });
        });

    app.get('/api/messages/', function(req,res){
        //Create a channel
        const chatRoom = io.of('/'+req.user.id)
        chatRoom.on('connection',function(socket){
            console.log('a user connected to channel ', req.user.id);
            socket.on('newMessage', function(msg){
                chatRoom.emit('messageBroadcast', msg);
            });
            socket.on('disconnect', function(){
                console.log('user disconnected from ', req.user.id);
            });
        })
        res.send(Object.keys(io.nsps))
    })
}
