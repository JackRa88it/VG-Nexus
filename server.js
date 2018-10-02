const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var formidable = require('formidable');
var fs = require('fs');
var extract = require('extract-zip')
const PORT = process.env.PORT || 3001;


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post('/upload',function(req,res){
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
            var dir = "./user"
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }

            //Unzip the file to target directory
            var target = __dirname+"/client/public/user"
            extract(newpath,{dir:target},function(err){
                console.log('extracting')
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

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
