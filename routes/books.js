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
  .sort('-eid')
  .exec(function (err, book) {
    res.json(book);
  }); 
});

//show
router.get("/:eid", function(req, res){
  Book.findOne({eid:req.params.eid})
  .sort('-eid')
  .exec(function (err, book) {
    console.log(book);
    res.json(schebookdule);
  }); 
});



//delete
router.delete("/:eid", function(req, res){
  Book.remove({eid: req.params.eid}, function(req, response){
    res.json({delete : "success"}); 
  });
});


//-------------------------------------------------------//


//module & export
module.exports = router; 
