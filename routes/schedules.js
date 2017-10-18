//routes/schedule.js

const express = require('express');
var router = express.Router();
var Schedule = require('../models/Schedule');
var https = require('https');
var http = require('http');
var qs = require('querystring');
var request = require("request");
var xml2js = require('xml2js');
var cheerio = require('cheerio');

//index
router.get("/", function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({a:1}));
	console.log("Get");
});


//show
router.get("/:eid", function(req, res){
  Schedule.findOne({eid:req.params.eid}, function(err, schedules){
    if(err)
      res.json(err);
    else
    {

    }
  });
});

//create


//create
router.post("/", function(req, res){
  //get last eid of schedules


  Schedule.create({eid:1, date:req.body.date, title:req.body.title, sort:req.body.sort}, 
    function(err, schedule){
      if(err)
        res.json(err);
      else
      {
        console.log("create", schedule);
      }
    });
});


//module & export
module.exports = router; 
