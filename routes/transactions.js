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
  Transaction.find({idname:req.params.buyer_id}, function(err, transaction){
    if(err)
    {

    }
    else if(!transaction)
    {

    }
    else
    {
      res.json(transaction);
    }
  });
});

router.get("/seller_id/:seller_id", function(req, res){
  Transaction.find({idname:req.params.seller_id}, function(err, transaction){
    if(err)
    {

    }
    else if(!transaction)
    {

    }
    else
    {
      res.json(transaction);
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
  .exec(function (err, transaction) {
    if(!transaction){
      lastNum = 0;
    }
    else
      lastNum = transaction.uid;

    //if not error
    Transaction.create({uid:lastNum+1, book_id : req.body.book_id,
                buyer_id:req.body.buyer_id, seller_id:req.body.seller_id, 
                price:req.body.price, phonenumber:req.body.phonenumber, 
                description:req.body.description}, function(err, User){
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



module.exports = router; 
