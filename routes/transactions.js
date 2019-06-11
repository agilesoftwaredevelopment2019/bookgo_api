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
  try {
    Transaction.find({})
    .sort('-uid')
    .exec(function (err, transaction) {
      res.json(transaction);
    }); 
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

//show
router.get("/buyer_id/:buyer_id", function(req, res){
  try {
    Transaction.find({idname:req.params.buyer_id}, function(err, transaction){
      if(err)
      {
        res.json({result: 'ERROR'});
      }
      else if(!transaction)
      {
        res.json({result: 'NOT_FOUND'});
      }
      else
      {
        res.json(transaction);
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

router.get("/seller_id/:seller_id", function(req, res){
  try {
    Transaction.find({idname:req.params.seller_id}, function(err, transaction){
      if(err)
      {
        res.json({result: 'ERROR'});
      }
      else if(!transaction)
      {
        res.json({result: 'NOT_FOUND'});
      }
      else
      {
        res.json(transaction);
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

//Create
router.post("", function(req, res){
  try {
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
      Transaction.create({uid:lastNum+1, 
                  product_id: req.body.product_id,
                  buyer_id:req.body.buyer_id, 
                  seller_id:req.body.seller_id, 
                  price:req.body.price, 
                  message:req.body.message,
                  phonenumber:req.body.phonenumber}, function(err, transcation){
        Product.updateOne({uid:req.body.product_id}, {onSale:true}, function(err, product){
          if(err) {
            res.json({result: 'ERROR'});
          }
          else
            res.json({result: 'CREATE'});
        });
      });
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});



module.exports = router; 
