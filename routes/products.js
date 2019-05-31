//routes/users.js

const express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var Book = require('../models/Book');
var https = require('https');
var http = require('http');
var qs = require('querystring');

//index
router.get("", function(req, res){
  Product.find({})
  .sort('-uid')
  .exec(function (err, user) {
    res.json(user);
  }); 
});

//show
router.get("/:idname", function(req, res){
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

//Create
router.post("", function(req, res){
  console.log("Register");

  //get last eid of schedules
  var lastNum;
  Product.findOne({})
  .sort('-uid')
  .exec(function (err, product) {
    if(!product){
      lastNum = 0;
    }
    else
      lastNum = product.uid;
    
    //if not error
    Product.create({uid:lastNum+1, book_id:req.body.book_id, seller_id : req.body.seller_id,
                price:req.body.price, soldout:false}, function(err, product){
    if(err) {
      res.json(err.message);
    }
    else
      res.json({success: true});
    });
  });
});

router.put("", function(req, res){
  soldout = req.body.soldout;
  Product.updateOne({uid:req.body.id}, {soldout: soldout}, function(err, product){
    res.json({success: true});
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
