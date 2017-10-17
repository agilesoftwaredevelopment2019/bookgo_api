//routes/posts.js

const express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var https = require('https');
var http = require('http');
var qs = require('querystring');
var request = require("request");
var xml2js = require('xml2js');

//index
router.get("/", function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({a:1}));
	console.log("Get");
});

//get CompanyName, JoinDay, Name, birthday and search users
router.post("/", function(req, res){
    

    //airforce - name(ex. 성태종), birthday(ex. 19941012)
    if(req.body.CompanyName == "AirForce")
    {
      var options = {
        method: 'POST',
        url: 'http://www.airforce.mil.kr:8081/user/emailPicViewSameMembers.action',
        headers:{
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded'
        },
        form: {siteId:'last2', searchName: req.body.Name, searchBirth: req.body.BirthDay}
      };

      request(options, function(error, response, body) {
        if(error) throw new Error(error);



        //parse response data
        var index = body.toString().search("<strong>") + 8;
        var index2 = body.toString().search("</strong>");
        var name = body.toString().substring(index, index2);
        console.log(index, index2, name);
        res.send(response);

      
      });
    }    
    /*
    //army(nonsan) - find from c23~c28
    else if(req.body.CompanyName == "Army")
    {
      var options = {
        method: 'POST',
        url: 'http://www.katc.mil.kr/katc/popup_childrenSearch',
        headers:{
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded'
        },
        form: {search:search_key1:child_search:'etc_char', search_key2:child_search : 'etc_char9',
        search_key3:child_search : 'etc_char1', search_val1 : 'MjAxNzEwMTIreq.body.Name, searchBirth: req.body.BirthDay}
      };

      request(options, function(error, response, body) {
        if(error) throw new Error(error);

        //parse 
      });
    }*/
    //div - CompanyName(ex. div23), Name(ex.김준희)
    else 
    {
      var options = {
        method: 'POST',
        url: 'http://www.army.mil.kr/iletter/checkRec.do',
        headers:{
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded'
        },
        form: {div_code : req.body.CompanyName, name : req.body.Name}
      };

      request(options, function(error, response, body) {
        if(error) throw new Error(error);

        var lastMatch;
        var result = [];
        var searchStr = "";

        var index1 = body.toString().search("recruit_idx") + 12;
        
        //parse 

        //if exist
        if(index1 > 0)
        {
          res.send("/iletter/emsWrite.do?recruit_idx=267073");
          //response is .recruit_idx=****
        }
      });



    }

    //army(sadan) - find from div1 ~ div
});

module.exports = router; 
