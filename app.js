//app.js

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//DB Settings
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
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
app.use("/books", require("./routes/books"));
app.use("/products", require("./routes/products"));
app.use("/transactions", require("./routes/transactions"));

//Server
app.listen(process.env.PORT || 3000, function(){
 console.log("BookGo server on!");
});