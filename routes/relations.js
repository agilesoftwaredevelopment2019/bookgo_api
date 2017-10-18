//routes/relations.js

const express = require('express');
var router = express.Router();
var Relation = require('../models/Relation');
var https = require('https');
var http = require('http');
var qs = require('querystring');
var request = require("request");

//index
router.get("/", function(req, res){

});

//find relation by idname
router.get("/idname/:idname", function(req, res){
  Relation.find({idname:req.params.idname}, function(err, db_dt){
    if(err)
      res.json(err);
    else{
      if(db_dt == null)
      {
        //no data
        res.json();
      }
      else{
        res.json(db_dt);
      }
    }
  });
});

//find relation by eid
router.get("/eid/:eid", function(req, res){
  Relation.find({eid:req.params.eid}, function(err, db_dt){
    if(err)
      res.json(err);
    else{
      if(db_dt == null)
      {
        //no data
        res.json();
      }
      else{
        res.json(db_dt);
      }
    }
  });
});

//create
router.post("/", function(req, res){
  Relation.create({idname:req.body.idname, eid:req.body.eid}, function(err, relation){
    console.log("in");
    if(err)
      res.json(err);
    else
    {
      console.log("create", relation);
      res.json(relation);
    }
  });
});


//delete by eid
router.delete("/eid/:eid", function(req, res){
  Relation.remove({eid:req.params.eid}, function(req, response){
    res.json({delete:"complete"});
  });
});

//delete by eid
router.delete("/idname/:idname", function(req, res){
  Relation.remove({idname:req.params.idname}, function(req, response){
    res.json({delete:"complete"});
  });
});

//module & export
module.exports = router; 
