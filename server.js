const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
var passport = require("./config/passport");
var db = require("./models");
var session = require("express-session");

var http = require('http').Server(app);
var io = require('socket.io')(http);




// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
else{
  app.use(express.static("client/public/user"));
}
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/upload',function(req,res){
    var form = new formidable.IncomingForm()
    form.parse(req,function(err,fields,files){
        console.log('parsing files')
        var oldpath = files.filetoupload.path;
        var newpath = __dirname + "/" + files.filetoupload.name
        fs.rename(oldpath, newpath, function (err) {
            console.log('renaming filepaths')
            if (err) throw err;
            var dir = "./user"
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            var target = __dirname+"/client/public/user"
            extract(newpath,{dir:target},function(err){
                console.log('extracting')
                if(err) throw err;
                fs.unlink(newpath, (err) => {
                    if (err) throw err;
                    console.log('deleting' + newpath );
                    res.write('File uploaded and moved!');
                    res.end();
                  });
            })
        });
    })
})

require("./routes/api-routes.js")(app,io)

app.get("/fun",function(req,res){
  res.sendFile(__dirname+'/client/public/user/index.html')
})
const routes = require("./routes/sequelize-template-routes.js")
app.use(routes)
// Start the API server
db.sequelize.sync().then(function(){
    app.listen(PORT, function() {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
      });
})

