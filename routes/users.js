//routes/users.js

const express = require('express');
var router = express.Router();
var User = require('../models/User');
var Product = require('../models/Product');

//index
router.get("", function(req, res){
  try {
    User.find({})
    .sort('-uid')
    .exec(function (err, user) {
      res.json(user);
    }); 
  } catch (err) {
    res.json({result: 'ERROR'})
  }

});

//show
router.get("/idname/:idname", function(req, res){
  try {
    User.findOne({idname:req.params.idname}, function(err, user){
      res.json(user);
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});


//Login
router.post("/login", function(req, res){
  try{
    User.findOne({idname:req.body.idname, password:req.body.password}, function(err, user){
      if(!user) {
        res.json({result: 'WRONG PASSWORD'});
      }
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

//Create
router.post("", function(req, res){
  try{
    var lastNum;
    User.findOne({})
    .sort('-uid')
    .exec(function (err, user) {
      if(!user){
        lastNum = 0;
      }
      else
        lastNum = user.uid;
  
      //if not error
      User.create({uid:lastNum+1, 
                  idname:req.body.idname, 
                  password:req.body.password, 
                  nickname:req.body.nickname,
                  name:req.body.name, 
                  phonenumber:req.body.phonenumber}, function(err, user){
        console.log(user)
        res.json({result: 'CREATE'});
      });
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});

router.put("/authenticate", function(req, res){
  updatedAuthentication = req.body.isAuthenticated;
  User.updateOne({idname:req.body.idname}, {isAuthenticated:updatedAuthentication}, function(err, user){
    res.json({result: 'AUTHENTICATE'});
  });
});

router.delete("/:uid", function(req, res){
  try{
    Product.deleteMany({seller_id:req.params.uid}, function(err, product){
      User.deleteOne({uid:req.params.uid}, function(err, user){
        res.json({result: 'DELETE'});
      });
    });
  } catch (err) {
    res.json({result: 'ERROR'});
  }
});


module.exports = router; 
