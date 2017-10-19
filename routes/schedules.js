//routes/schedule.js

const express = require('express');
var router = express.Router();
var Schedule = require('../models/Schedule');
var Relation = require('../models/Relation');
var https = require('https');
var http = require('http');
var qs = require('querystring');
var request = require("request");
var xml2js = require('xml2js');
var cheerio = require('cheerio');

//index
router.get("", function(req, res){
  Schedule.find({})
  .sort('-eid')
  .exec(function (err, schedule) {
    res.json(schedule);
  }); 
});


//show
router.get("/:eid", function(req, res){
  Schedule.findOne({eid:req.params.eid})
  .sort('-eid')
  .exec(function (err, schedule) {
    console.log(schedule);
    res.json(schedule);
  }); 
});


//create
router.post("/", function(req, res){
  //get last eid of schedules
  var lastNum;
  Schedule.findOne({})
  .sort('-eid')
  .exec(function (err, schedule) {
    if(!schedule)
      lastNum = 0;
    else
      lastNum = schedule.eid;

    var newEId = lastNum+1;

    //make eid
    Schedule.create({eid:newEId, date:req.body.date, title:req.body.title, sort:req.body.sort, detail:req.body.detail}, 
      function(err, schedule){
        if(err)
          res.json(err);
        else
        {
          //make relation between uid and eid
          Relation.create({uid: req.body.uid, eid:newEId}, function(err, relation){
            if(err)
              res.json(err);
            else
            {
              console.log("create", schedule);
              res.json(schedule);
            }
          });
        }
      });
    }); 
});


//edit
router.put("/", function(req, res) {
  Schedule.findOne({eid: req.body.eid}, function(err, schedule) {
    if(err)
    {
      res.json(err);
    }
    else
    {
      schedule.title = req.body.title || schedule.title;
      schedule.date = req.body.date || schedule.date;
      schedule.sort = req.body.sort || schedule.sort;
      schedule.detail = req.body.detail || schedule.detail;

      schedule.save(function(err, sch) {
        if(err)
          res.json(err);
        else
          res.json(schedule);
      });
    }
  });
});

//delete
router.delete("/:eid", function(req, res){
  Schedule.remove({eid: req.params.eid}, function(req, response){
    res.json({delete : "success"}); 
  });
});


//-------------------------------------------------------//


//module & export
module.exports = router; 
