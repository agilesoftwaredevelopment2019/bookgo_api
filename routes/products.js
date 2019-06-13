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

//get product data with book data
router.get("/listWithTitle", async function(req, res){
  try{
    let items = []
    let item;
    Product.find({onSale: true}, async function (err, products) {
      if(products.length === 0){
        res.json({result: 'NOT_FOUND'});
      }
      for (var i=0; i<products.length; i++){
        product = products[i];
        bookInfo = await Book.findOne({uid:product.book_id});
        item = {title: bookInfo.title, 
          author: bookInfo.author,
          publisher: bookInfo.publisher,
          product_id: product.uid,
          seller_id: product.seller_id,
          image_path: product.image_path,
          description: product.description,
          price: product.price};
        items.push(item);
        if (i === products.length - 1) {
          res.json(items);
        }
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
})


router.get("/user_interest/:user_id", async function(req, res){
  try {
    let items = []
    let item;
    Interest.find({user_id:req.params.user_id}, async function(err, interests){
      if(err){
        res.json({result: 'ERROR'});
      } else if (!interests) {
        res.json({result: 'NOT_FOUND'});
      } else {
        for (var i=0; i<interests.length; i++){
          product = await Product.findOne({uid:interests[i].product_id, onSale:true});
          if (product === null){
            console.log("null");
          }
          else {
            bookInfo = await Book.findOne({uid:product.book_id});
            item = {title: bookInfo.title, 
              author: bookInfo.author,
              publisher: bookInfo.publisher,
              product_id: product.uid,
              seller_id: product.seller_id,
              image_path: product.image_path,
              description: product.description,
              price: product.price};
            items.push(item);
          }
          if (i === interests.length - 1) {
            res.json(items);
          }
        }
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

router.get("/buyer_id/:buyer_id", function(req, res){
  try {
    Transaction.find({buyer_id:req.params.buyer_id}, async function(err, transactions){
      if(err){
        res.json({result: 'ERROR'});
      } else if (!transactions) {
        res.json({result: 'NOT_FOUND'});
      } else {
        result = [];
        let items = []
        let item;
        for (var i=0; i<transactions.length; i++){
          await Product.findOne({uid:transactions[i].product_id}, async function(err, product){
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
              bookInfo = await Book.findOne({uid:product.book_id});
              item = {title: bookInfo.title, 
                author: bookInfo.author,
                publisher: bookInfo.publisher,
                product_id: product.uid,
                seller_id: product.seller_id,
                image_path: product.image_path,
                description: product.description,
                price: product.price};
              result.push(item);
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
    let items = []
    let item;
    Product.find({seller_id:req.params.seller_id}, async function(err, products){
      if(err)
      {
        res.json({result: 'ERROR'});
      }
      else if(!products)
      {
        res.json({result: 'NOT_FOUND'});
      }
      for (var i=0; i<products.length; i++){
        product = products[i];
        bookInfo = await Book.findOne({uid:product.book_id});
        item = {title: bookInfo.title, 
          author: bookInfo.author,
          publisher: bookInfo.publisher,
          product_id: product.uid,
          seller_id: product.seller_id,
          image_path: product.image_path,
          description: product.description,
          price: product.price};
        items.push(item);
        if (i === products.length - 1) {
          res.json(items);
        }
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

//show 
router.get("/title/:title", function(req, res){
  try {
    let decoded_title = decodeURIComponent(req.params.title)
    Book.findOne({title:decoded_title}, function(err, book){
      if(err){
        res.json({result: 'ERROR'});
      }
      else if(!book){
        res.json({result: 'NOT_FOUND'});
      }
      else{
        finding_book_id = book.uid;
        title = book.title;
        author = book.author;
        publisher = book.publisher;
        Product.find({book_id:finding_book_id, onSale:true}, function(err, products){
        if(err){
          res.json({result: 'ERROR'});
        }
        else if(!products){
          res.json({result: 'NOT_FOUND'});
        }
        else{
          items = []
          for (var i=0; i<products.length; i++){
            item = {title: title, 
              author: author,
              publisher: publisher,
              product_id: products[i].uid,
              seller_id: products[i].seller_id,
              image_path: products[i].image_path,
              description: products[i].description,
              price: products[i].price};
            items.push(item);
          }
          res.json(items);
        }
        });
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

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
                onSale:true}, function(err, product){
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
