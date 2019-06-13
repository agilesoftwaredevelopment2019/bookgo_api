//routes/users.js

const express = require('express');
var router = express.Router();
var Transaction = require('../models/Transaction');
var Product = require('../models/Product');
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
    Transaction.find({buyer_id:req.params.buyer_id}, function(err, transaction){
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
    .exec(async function (err, transaction) {
      if(!transaction){
        lastNum = 0;
      }
      else
        lastNum = transaction.uid;
  
      //if not error
      transaction_response = await Transaction.create({uid:lastNum+1, 
                  product_id: req.body.product_id,
                  buyer_id:req.body.buyer_id, 
                  seller_id:req.body.seller_id, 
                  price:req.body.price, 
                  message:req.body.message,
                  phonenumber:req.body.phonenumber});
      if (transaction_response){
        productResponse = await Product.updateOne({uid:req.body.product_id}, {onSale:false});  
        if (productResponse){
          res.json({result: 'CREATE'});  
        }
        else {
          res.json({result: 'ERROR'});
        }
      } else {
        res.json({result: 'ERROR'});
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});



module.exports = router; 
