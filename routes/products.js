//routes/users.js

const express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var Book = require('../models/Book');
var Interest = require('../models/Interest');
var Transaction = require('../models/Transaction');


//index
router.get("", function(req, res){
  try{
    Product.find({})
    .sort('-uid')
    .exec(function (err, product) {
      res.json(product);
    }); 
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

router.get("/user_interest/:user_id", async function(req, res){
  try {
    Interest.find({user_id:req.params.user_id}, async function(err, interests){
      if(err){
        res.json({result: 'ERROR'});
      } else if (!interests) {
        res.json({result: 'NOT_FOUND'});
      } else {
        result = [];
        for (var i=0; i<interests.length; i++){
          await Product.find({uid:interests[i].product_id}, function(err, product){
            if(err)
            {
              res.json({result: 'ERROR'});
            }
            else if(!product)
            {
              res.json({result: 'NOT_FOUND'});
            }
            else
            {
              result.push(product);
            }
          });
        }
        res.json(result);
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

router.get("/buyer_id/:buyer_id", async function(req, res){
  try {
    Transaction.find({buyer_id:req.params.buyer_id}, async function(err, transactions){
      if(err){
        res.json({result: 'ERROR'});
      } else if (!transactions) {
        res.json({result: 'NOT_FOUND'});
      } else {
        result = [];
        for (var i=0; i<transactions.length; i++){
          await Product.find({uid:transactions[i].product_id}, function(err, product){
            if(err)
            {
              res.json({result: 'ERROR'});
            }
            else if(!product)
            {
              res.json({result: 'NOT_FOUND'});
            }
            else
            {
              result.push(product);
            }
          });
        }
        res.json(result);
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

router.get("/seller_id/:seller_id", function(req, res){
  try {
    Product.find({seller_id:req.params.seller_id}, function(err, product){
      if(err)
      {
        res.json({result: 'ERROR'});
      }
      else if(!product)
      {
        res.json({result: 'NOT_FOUND'});
      }
      else
      {
        res.json(product);
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

//show 
router.get("/:book_name", function(req, res){
  try {
    Book.findOne({title:book_name}, function(err, book){
      if(err){
        res.json({result: 'ERROR'});
      }
      else if(!book){
        res.json({result: 'NOT_FOUND'});
      }
      else{
        finding_book_id = book.uid;
        Product.find({book_id:finding_book_id, soldout:false}, function(err, user){
        if(err){
          res.json({result: 'ERROR'});
        }
        else if(!user){
          res.json({result: 'NOT_FOUND'});
        }
        else{
          res.json(user);
        }
        });
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

//Create without Image
router.post("", function(req, res){
  try{
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
      Product.create({uid:lastNum+1, 
                book_id:req.body.book_id, 
                seller_id : req.body.seller_id,
                price:req.body.price, 
                image_path:req.body.image_path, 
                description:req.body.description, 
                onSale:false}, function(err, product){
      if(err) {
        res.json({result: 'ERROR'});
      }
      else
        res.json({result: 'CREATE', uid:product.uid});
      });
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

//Soldout
router.put("/onSale", function(req, res){
  try {
    onSale = req.body.onSale;
    Product.updateOne({uid:req.body.uid}, {onSale: onSale}, function(err, product){
      res.json({result: 'CHANGE_ONSALE'});
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

//Change Price
router.put("/changePrice", function(req, res){
  try{
    Product.updateOne({uid:req.body.uid}, {price: req.body.price}, function(err, product){
      res.json({result: 'CHANGE_PRICE'});
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

router.delete("/:uid", function(req, res){
  try {
    Product.remove({uid:req.params.uid}, function(err, product){
      res.json({result: 'DELETE'});
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

module.exports = router; 
