var db = require("../models");
var passport = require("../config/passport");
var formidable = require('formidable');
const path = require('path')
var fs = require('fs')
var extract = require('extract-zip')

module.exports = function (app,io){
    io.on('connection',function(socket){
        console.log('a user connected to /');        
        socket.on('disconnect', function(){
          console.log('user disconnected from /');
        });
      })
      console.log("wabulubadubdub")
      db.Game.findAll({})
        .then(function(games){
            for (let i=0;i<games.length;i++){
                const gameRoom = io.of('/game/' + games[i].id)
                gameRoom.on('connection', function(socket){
                    console.log('a user connected to /game/' + games[i].id);
                    socket.on('messagePost', function(msg, name){
                        console.log("something sent")
                      gameRoom.emit('messagePost', msg, name);
                    });
                    
                    gameRoom.on('disconnect', function(){
                      console.log('user disconnected from /game/1');
                    });
                  })
            }
            
        })


    app.post('/upload',function(req,res){
        if(req.user){
            //Initialize an empty form
            var form = new formidable.IncomingForm()
            form.maxFileSize = Math.pow(1024,3)
            form.parse(req,function(err,fields,files){
                db.Game.create({
                    name: fields.name,
                    description: fields.description,
                    UserId: req.user.id,
                }).then(function(game) {
                    const tags = JSON.parse(fields.tags)
                    //For each tag find the tag ID
                    tags.forEach(function(tag){
                        db.Tag.findOne({
                            where:{
                                name: tag.text}
                            }
                        ).then(function(found){
                            //With a tag ID associate the two inside the join table
                            game.addTag(found.id)
                            .then(function(){
                                
                            }).catch(function(err){console.log(err)});
                        }).catch(function(err){console.log(err)});
                    })
                    if(err) throw err;
                    //fields are any values that are not files that were sent with the form whose keys are the name of the input
                    //Grab the path of the file that was just uploaded "filetoupload" is the name of the input on the frontend
                    var oldpath = files.filetoupload.path;
                    //Create a newpath to store the file at
                    var newpath = __dirname + "/" + files.filetoupload.name

                    fs.rename(oldpath, newpath, function (err) {
                        console.log('renaming filepaths')
                        if (err) throw err;

                        //Create a directory if it doesn't already exist
                        var dir = "./client/public/" + game.id
                        if (!fs.existsSync(dir)){
                            console.log('path does not exist \n creating newpath')
                            fs.mkdirSync(dir);
                        }

                        //Unzip the file to target directory
                        var target = path.join(__dirname,'../client/public/' + game.id)
                        extract(newpath,{dir:target},function(err){
                            console.log('extracting to ', target)
                            if(err) throw err;
                            fs.unlink(newpath, (err) => {
                                if (err) throw err;
                                console.log('deleting' + newpath );
                                //Redirect the user in the frontend to their game
                                res.send('/all/games/'+game.id);  
                            });
                        })
                    });
                }).catch(function(err){console.log(err)})
            })
        }  
    })

    app.get('/api/authenticate',function(req,res){
        if(req.user){
            res.send(req.user.username);
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
