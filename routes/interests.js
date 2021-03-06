//routes/users.js

const express = require('express');
var router = express.Router();
var Interest = require('../models/Interest');
var Product = require('../models/Product');

//index
router.get("", function(req, res){
  try{
    Interest.find({})
    .sort('-uid')
    .exec(function (err, interest) {
      res.json(interest);
    }); 
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

//show
router.get("/:user_id", function(req, res){
  try {
    Interest.find({user_id:req.params.user_id}, function(err, interests){
      if(err)
      {
        res.json({result: 'ERROR'});
      }
      else if(!interests)
      {
        res.json({result: 'NOT_FOUND'});
      }
      else
      {
        res.json(interests);
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});




//Create
router.post("", function(req, res){
  try{
    //get last eid of schedules
    var lastNum;
    Interest.findOne({})
    .sort('-uid')
    .exec(function (err, interest) {
      if(!interest){
        lastNum = 0;
      }
      else
        lastNum = interest.uid;

      //if not error
      Interest.create({uid:lastNum+1, user_id:req.body.user_id, product_id:req.body.product_id}, function(err, interest){
      if(err) {
        res.json({result: 'ERROR'});
      }
      else
        res.json({create: 'success'});
      });
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

router.delete("/:user_id/:product_id", function(req, res){
  try {
    Interest.remove({user_id:req.params.user_id, 
            product_id:req.params.product_id}, function(err, interest){
      res.json({result: 'DELETE'});
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});


module.exports = router; 
