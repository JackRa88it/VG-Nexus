const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var formidable = require('formidable');
var fs = require('fs');
var extract = require('extract-zip')
const PORT = process.env.PORT || 3001;
const db = require("./models")
// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

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


const routes = require("./routes/sequelize-template-routes.js")
app.use(routes)
// Start the API server
db.sequelize.sync().then(function(){
    app.listen(PORT, function() {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
      });
})

