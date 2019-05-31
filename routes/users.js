//routes/users.js

const express = require('express');
var router = express.Router();
var User = require('../models/User');
var Product = require('../models/Product');
var https = require('https');
var http = require('http');
var qs = require('querystring');

//index
router.get("", function(req, res){
  User.find({})
  .sort('-uid')
  .exec(function (err, user) {
    res.json(user);
  }); 
});

//show
router.get("/idname/:idname", function(req, res){
  User.findOne({idname:req.params.idname}, function(err, user){
    if(err)
    {

    }
    else if(!user)
    {

    }
    else
    {
      res.json(user);
    }
  });
});


//Login
router.post("/login", function(req, res){
    console.log("login into");
    User.findOne({idname:req.body.id, password:req.body.password}, function(err, user){
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
        res.json(user);
      }
    });
  });

//Create
router.post("", function(req, res){
  console.log("Singup");

  //get last eid of schedules
  var lastNum;
  User.findOne({})
  .sort('-uid')
  .exec(function (err, user) {
    if(!user){
      lastNum = 0;
    }
    else
      lastNum = user.uid;

    //if not error
    User.create({uid:lastNum+1, idname:req.body.id, password:req.body.password, nickname:req.body.nickname,
                name:req.body.name, phonenumber:req.body.phonenumber, isAuthenticated:false}, function(err, User){
    if(err) {
      res.json(err.message);
    }
    else
      res.json({create: 'success'});
    });
  });
});

router.put("/authenticate", function(req, res){
  updatedAuthentication = req.body.authentication;
  User.updateOne({idname:req.body.id}, {isAuthenticated:updatedAuthentication}, function(err, user){
    res.json({id:req.body.id, authenticated:req.body.authentication});
  });
});

router.delete("/:id", function(req, res){
  //remove products by user
  Product.deleteMany({seller_id:req.params.id}, function(err, user){
    User.deleteOne({uid:req.params.id}, function(err, user){
      res.json({delete: 'success'});
    });
  });
});


module.exports = router; 
