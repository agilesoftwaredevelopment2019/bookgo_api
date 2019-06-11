//routes/schedule.js

const express = require('express');
var router = express.Router();
var Book = require('../models/Book');

//index
router.get("", function(req, res){
  try{
    Book.find({})
    .sort('-uid')
    .exec(function (err, book) {
      res.json(book);
    }); 
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

//show
router.get("/:uid", function(req, res){
  try {
    Book.findOne({uid:req.params.uid})
    .sort('-uid')
    .exec(function (err, book) {
      res.json(book);
    }); 
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});


//Create
router.post("", function(req, res){
  try {
    var lastNum;
    Book.findOne({})
    .sort('-uid')
    .exec(function (err, book) {
      if(!book){
        lastNum = 0;
      }
      else
        lastNum = book.uid;
  
      //if not error
      Book.create({uid:lastNum+1, 
                title:req.body.title, 
                author:req.body.author, 
                publisher:req.body.publisher}, function(err, book){
      if(err) {
        res.json({result: 'ERROR'});
      }
      else
        res.json({result: 'CREATE'});
      });
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});


//delete
router.delete("/:uid", function(req, res){
  try {
    Book.remove({uid: req.params.uid}, function(req, response){
      res.json({delete : "success"}); 
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});


//module & export
module.exports = router; 
