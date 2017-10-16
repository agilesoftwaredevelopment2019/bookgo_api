//routes/posts.js

const express = require('express');
var router = express.Router();
var Post = require('../models/Post');

//index
router.get("/", function(req, res){
	res = "hello";
	console.log(req);
});

router.post("/", function(req, res){
	console.log("Post", req);
})

module.exports = router; 
