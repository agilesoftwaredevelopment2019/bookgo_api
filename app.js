//app.js

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//DB Settings
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://oscha:qlqjs123@ds127894.mlab.com:27894/online-db-oscha", { useMongoClient: true });
var db = mongoose.connection;
db.once("open", function(){
	console.log("DB Connected");
});
db.on("error", function(err){
	console.log("DB Error");
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
app.use("/users", require("./routes/users"));
app.use("/schedules", require("./routes/schedules"));
app.use("/relations", require("./routes/relations"));

//Server
app.listen(8080, function(){
 console.log("Ceremony Helper server on!");
});