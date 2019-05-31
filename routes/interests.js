//routes/users.js

const express = require('express');
var router = express.Router();
var Interest = require('../models/Interest');
var Product = require('../models/Product');
var https = require('https');
var http = require('http');
var qs = require('querystring');

//index
router.get("", function(req, res){
  Interest.find({})
  .sort('-uid')
  .exec(function (err, interest) {
    res.json(interest);
  }); 
});

//show
router.get("/:user_id", function(req, res){
  Interest.find({idname:req.params.user_id}, function(err, interest){
    if(err)
    {

    }
    else if(!user)
    {

    }
    else
    {
      res.json(interest);
    }
  });
});


//Create
router.post("", function(req, res){
  //get last eid of schedules
  var lastNum;
  Interest.findOne({})
  .sort('-uid')
  .exec(function (err, interest) {
    if(!interest){
      lastNum = 0;
    }
    else
      lastNum = interest.uid;

    //if not error
    Interest.create({uid:lastNum+1, user_id:req.body.user_id, book_id:req.body.book_id}, function(err, interest){
    if(err) {
      res.json(err.message);
    }
    else
      res.json({create: 'success'});
    });
  });
});

router.delete("/:user_id/:book_id", function(req, res){
  //remove products by user
  Interest.deleteOne({user_id:req.params.user_id, book_id:req.params.book_id}, function(err, interest){
    res.json({delete: 'success'});
  });
});


module.exports = router; 
