//routes/users.js

const express = require('express');
var router = express.Router();
var Transaction = require('../models/Transaction');
var Product = require('../models/Product');
var https = require('https');
var http = require('http');
var qs = require('querystring');

//index
router.get("", function(req, res){
  Transaction.find({})
  .sort('-uid')
  .exec(function (err, transaction) {
    res.json(transaction);
  }); 
});

//show
router.get("/buyer_id/:buyer_id", function(req, res){
  Transaction.findOne({idname:req.params.id}, function(err, user){
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

router.get("/seller_id/:seller_id", function(req, res){
  User.findOne({idname:req.params.id}, function(err, user){
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

//Create
router.post("", function(req, res){
  console.log("Make Transaction");

  //get last eid of schedules
  var lastNum;
  Transaction.findOne({})
  .sort('-uid')
  .exec(function (err, user) {
    if(!user){
      lastNum = 0;
    }
    else
      lastNum = user.uid;

    //if not error
    Transaction.create({uid:lastNum+1, book_id : req.body.book_id,
                buyer_id:req.body.buyer_id, seller_id:req.body.seller_id, price:req.body.price}, function(err, User){
      Product.updateOne({uid:req.body.product_uid}, {soldout:true}, function(err, user){
      });
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

// //Authenticat
// router.put("/authenticate", function(req, res){
//   console.log("Authenticate");

//   User.findOne({idname:req.body.id}, function(err, user){
//     if(err)
//     {
//       console.log("Authenticate denied.");
//       res.json(err);
//     }
//     if(!user)
//     {
//       res.status(404).json("Not Found");
//     }
//     else
//     {
//       user.put()
//       console.log("Authentication Success");
//       console.log(user.nickname);
//       User
//       res.json(user);
//     }
//   });
// })


module.exports = router; 