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
      db.Game.findAll({})
        .then(function(games){
            for (let i=0;i<games.length;i++){
                newGame(games[i],io);
            }  
        })
    


    app.post('/upload',function(req,res){
        if(req.user){
            //Initialize an empty form
            var form = new formidable.IncomingForm()
            form.maxFileSize = Math.pow(1024,3)
            form.parse(req,function(err,fields,files){
                //fields are any values that are not files that were sent with the form whose keys are the name of the input
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
                                if(err) throw err;
                                //Grab the path of the file that was just uploaded "filetoupload" is the name of the input on the frontend
                                var oldpath = files.filetoupload.path;
                                var thumbnailPath = files.thumbnail.path;
                                //Create a newpath to store the file at
                                var newpath = path.join(__dirname, "../" + files.filetoupload.name)
                                var newThumbnailPath = path.join(__dirname, '../client/public/assets/gameThumbnails/' + game.id )
                                fs.rename(thumbnailPath,newThumbnailPath, function(err) {
                                    //Rename thumbnail
                                    if(err) throw err;
                                    fs.rename(oldpath, newpath, function (err) {
                                        console.log('renaming filepaths')
                                        if (err) throw err;
                                        
                                        //Create a directory if it doesn't already exist
                                        var dir = "./client/public/games/" + game.id
                                        if (!fs.existsSync(dir)){
                                            console.log('path does not exist \n creating newpath')
                                            fs.mkdirSync(dir);
                                        }
                
                                        //Unzip the file to target directory
                                        var target = path.join(__dirname,'../client/public/games/' + game.id)
                                        extract(newpath,{dir:target},function(err){
                                            console.log('extracting to ', target)
                                            if(err) throw err;
                                            fs.unlink(newpath, (err) => {
                                                if (err) throw err;
                                                console.log('deleting' + newpath );
                                                //Redirect the user in the frontend to their game
                                                newGame(game, io);
                                                res.send('/all/games/'+game.id);  
                                            });
                                        })
                                    });
                                }) 
                            }).catch(function(err){console.log(err)});
                        }).catch(function(err){console.log(err)});
                    })  
                }).catch(function(err){console.log(err)})
            })
        }  
    })

    app.get('/api/authenticate',function(req,res){
        if(req.user){
            // console.log("user authenticated")
            res.send(req.user);
        }
        else{
            console.log('user not authenticated')
            res.status(403).send('access denied')
        }
    })

    app.post("/api/login",passport.authenticate("local"),  function(req, res) {
        res.send('/');
    });

    app.get("/api/logout", function(req, res) {
        req.logout();
        res.send('/')
    });

    app.post('/api/upload/userimage',function(req,res){
        if(req.user){
            var form = new formidable.IncomingForm()
            form.parse(req,function(err,fields,files){
                if(err) throw err;
                var oldPath = files.profilephoto.path;
                var newPath = path.join(__dirname, '../client/public/assets/userThumbnails/' + req.user.id )
                fs.rename(oldPath,newPath, function(err) {
                    if(err) throw err
                })
            })
        }
    })

    app.post("/api/signup", function(req, res) {
        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
            postBanner: req.body.bannerUrl
          }).then(function(user) {
            var random = Math.floor(Math.random()*9) + 1
            var userImage = path.join(__dirname, '../client/public/assets/userThumbnails/Default'+random+'.png')
            var userImageCopy = path.join(__dirname, '../client/public/assets/userThumbnails/' + user.id)
            fs.createReadStream(userImage).pipe(fs.createWriteStream(userImageCopy));
            res.redirect(307, "/api/login");
        }).catch(function(err) {
            console.log(err);
            res.send(err);
        });
    });


    app.post('/api/game/:id/post/', function(req,res){
        //Create a comment and associate it with gameId :id
        if(req.user){
            db.Post.create({
                text: req.body.text,
                UserId: req.user.id,
                GameId: req.params.id,
            }).then((post) => {
                console.log(post)
                res.send('200')
            }).catch(function(err){
                console.log(err);
                res.json(err)
            })
        }
    })

    app.get('/api/post/:id/vote/',function(req,res){
        //This route returns the number of upvotes and downvotes on a post
        db.sequelize.query("SELECT upDown,count(upDown) as counts FROM votes WHERE PostId = "+req.params.id+" group by upDown", { type: db.sequelize.QueryTypes.SELECT
        // db.Vote.findAll({
        //     where:{
        //         PostId: req.params.id,
        //     },
        //     attributes: ['vote.upDown',[db.sequelize.fn('COUNT', db.sequelize.col('vote.upDown')),'counts']],
        //     group: ['vote.upDown'],
        }).then((voteCounts) => {
            //Data comes back as [{upDown: 0, counts: n} {upDown: 1, counts: 1}]
            voteCounts = {votes: voteCounts}
            if(req.user){
                //If the user is logged in find if they have previously voted on this comment or not
                db.Vote.findOne({
                    where:{
                        UserId: req.user.id,
                        PostId: req.params.id
                    },
                }).then((found) => {
                    if(found){
                        if(found.upDown){
                            voteCounts.upVoted = true
                        }
                        else{
                            voteCounts.downVoted = true
                        }
                    }
                    res.json(voteCounts)
                }).catch((err) => {
                    res.json(err)
                    console.log(err)
                })      
            }
            else{
                res.json(voteCounts)
            }
        }).catch((err) => {
            res.json(err)
            console.log(err)
        })
    })

    app.post('/api/post/:id/vote/',function(req,res){
        //Post a vote to the database
        if(req.user){
            db.Vote.upsert({
                upDown: req.body.vote,
                UserId: req.user.id,
                PostId: req.params.id
            }).then((post) => {
                res.send('200')
            }).catch((err) => {
                console.log(err);
                res.json(err)
            })
        }
    })

    app.get('/api/game/:id', function(req,res){
        //Grab game data with :id
        db.Game.findOne({
            where:{
                id: req.params.id
            },
            include: [{
                model: db.Post,
                include: db.User},
                db.User],
        }).then((game) => {
            res.json(game)
        }).catch(function(err) {
            console.log(err);
            res.json(err);
        });
    })

    app.get('/api/game/:id/post/', function(req,res){
        // Grab all posts from game :id
        db.Post.findAll({
            where:{
                GameId: req.params.id
            },
            order:[
                ['createdAt','DESC']
            ],
            include: [db.User],
        }).then((post) => {
            res.json(post)
        }).catch(function(err) {
            console.log(err);
            res.json(err);
        });
    })

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

function newGame(game,io) {
    const gameRoom = io.of('/game/' + game.id);
    gameRoom.on('connection', function (socket) {
        console.log('a user connected to /game/' + game.id);
        socket.on('messagePost', function (msg, name, id) {
            console.log("something sent");
            gameRoom.emit('messagePost', msg, name, id);
        });
        gameRoom.on('disconnect', function () {
            console.log('user disconnected from /game/' + game.id);
        });
    });
}



