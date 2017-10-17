//app.js

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

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
app.listen(8080, function(){
 console.log("server on!");
});