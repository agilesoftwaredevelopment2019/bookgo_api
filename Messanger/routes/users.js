//routes/users.js

const express = require('express');
var router = express.Router();
var User = require('../models/User');
var https = require('https');
var http = require('http');
var qs = require('querystring');

//index
router.get("/", function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({a:1}));
	console.log("Get");
});

//Login
router.post("/login", function(req, res){
    var id = req.body.ID;
    var password = req.body.PASSWORD;
    console.log("login into");

    console.log(id, password);
    User.findOne({idname:id, password:password}, function(err, user){
      if(err)
      {
        console.log("Login fail");
        res.json(err);
      }
      if(!user)
      {
        res.status(404).json("Not Found");
      }
      else
      {
        console.log("Login Success");
        console.log(user.nickname);
        res.json(user.nickname);
      }
    });
  });

//Create
router.post("/signup", function(req, res){
    console.log("Singup into");
  console.log(req.body);
    User.create({idname:req.body.ID, password:req.body.PASSWORD, nickname:req.body.NICKNAME}, function(err, ScheduleUser){
      if(err) {
        res.json({create: 'fail'});
      }
      else
      {
        res.json({create: 'success'});
      }
    });
  });

module.exports = router; 
