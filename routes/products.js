//routes/users.js

const express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var Book = require('../models/Book');


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

router.get("/lists", async function(req, res){
  Product.find({soldout:false})
  .exec(async function (err, product) {
    products = product.data;
    for (item in products) {
      bookId = item.book_id;
      
    }
  });
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
      
      // find if same book exist by name
      Book.findOne({title: req.body.title}, function(err, book){
        if(err){
          res.json({result: 'ERROR'});
        }
        else if(!book){
          Book.findOne({})
          .sort('-uid')
          .exec(function (err, book2) {
            if(!book) {
              lastNumForBook = 0;
            }
            else
            lastNumForBook = book2.uid;
            Product.create({uid:lastNum+1, 
                      book_id:lastNumForBook+1, 
                      seller_id : req.body.seller_id,
                      price:req.body.price, 
                      image_path:req.body.image_path, 
                      description:req.body.description, 
                      onSale:false}, function(err, product){
              if(err) {
                res.json({result: 'ERROR'});
              }
              else {
                res.json({result: 'CREATE', uid:product.uid});
              }
            });
          });
        }
        else {
          book_id = book.uid
          Product.create({uid:lastNum+1, 
                    book_id:book_id, 
                    seller_id : req.body.seller_id,
                    price:req.body.price, 
                    image_path:req.body.image_path, 
                    description:req.body.description, 
                    onSale:false}, function(err, product){
            if(err) {
              res.json({result: 'ERROR'});
            }
            else {
              res.json({result: 'CREATE', uid:product.uid});
            }
          });
        }
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
