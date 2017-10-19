//routes/posts.js

const express = require('express');
var router = express.Router();
var Post = require('../models/Post');
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


router.post("/contents", function(req, res){
  //get detailForm and submit
  //div
  if (true) {
    var options = {
        method: 'POST',
        //FIXME - using req.body get recruit_idix
        url: 'http://www.army.mil.kr/iletter/emsWrite.do?recruit_idx=262984',
        headers:{
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded'
        }
    };

    request(options, function(error, response, body) {
        if(error) throw new Error(error);

        console.log('request finish');
        var $ = cheerio.load(body);
        var doc = $('form[name=detailForm]');
        //input writer, pw, title, contents into the html
        $('#writer').val(req.body.Writer);
        $('#pw').val(req.body.Password);
        $('#title').val(req.body.Title);
        $('#contents').val("언제나 좋은 하루 되셨으면 좋겠습니다.");


       // doc.action = "http://www.army.mil.kr/iletter/emsWriteProc.do"


       //FIXME - send data


        res.send(doc.toString());
      });
  }
});

module.exports = router; 
