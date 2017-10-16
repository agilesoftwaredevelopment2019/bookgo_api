//app.js

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//DB Setting
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://OschA:qlqjs123@ds117965.mlab.com:17965/my-rest-api", { useMongoClient: true });
const db = mongoose.connection;
db.once("open", function(){
 console.log("DB connected");
});
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});

//Other Settings
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) { 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

//Routes
app.use("/posts", require("./routes/posts"));

//Server
app.listen(process.env.PORT, function(){
 console.log("server on!");
});