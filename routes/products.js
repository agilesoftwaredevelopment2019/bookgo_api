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
router.get("/:book_name", function(req, res){
  Book.findOne({title:book_name}, function(err, book){
    if(err){

    }
    else if(!book){
      console.log("Cannot find book");
    }
    else{
      finding_book_id = book.uid;
      Product.findOne({book_id:finding_book_id}, function(err, user){
      if(err){
      }
      else if(!user){
      }
      else{
        res.json(user);
      }
      });
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

//Soldout
router.put("/soldOut", function(req, res){
  soldout = req.body.soldout;
  Product.updateOne({uid:req.body.id}, {soldout: soldout}, function(err, product){
    res.json({success: true});
  });
});

//Change Price
router.put("/changePrice", function(req, res){
  Product.updateOne({uid:req.body.id}, {price: req.body.price}, function(err, product){
    res.json({success: true});
  });
});

module.exports = router; 
