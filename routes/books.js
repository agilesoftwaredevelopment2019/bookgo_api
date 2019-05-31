//routes/schedule.js

const express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var https = require('https');
var http = require('http');
var qs = require('querystring');
var request = require("request");
var xml2js = require('xml2js');
var cheerio = require('cheerio');

//index
router.get("", function(req, res){
  Book.find({})
  .sort('-uid')
  .exec(function (err, book) {
    res.json(book);
  }); 
});

//show
router.get("/:uid", function(req, res){
  Book.findOne({eid:req.params.eid})
  .sort('-uid')
  .exec(function (err, book) {
    res.json(book);
  }); 
});


//Create
router.post("", function(req, res){
  //get last eid of schedules
  var lastNum;
  Book.findOne({})
  .sort('-uid')
  .exec(function (err, book) {
    if(!user){
      lastNum = 0;
    }
    else
      lastNum = book.uid;

    //if not error
    Book.create({uid:lastNum+1, title:req.body.title}, function(err, User){
    if(err) {
      res.json(err.message);
    }
    else
      res.json({create: 'success'});
    });
  });
});


//delete
router.delete("/:uid", function(req, res){
  Book.remove({uid: req.params.uid}, function(req, response){
    res.json({delete : "success"}); 
  });
});


//-------------------------------------------------------//


//module & export
module.exports = router; 
