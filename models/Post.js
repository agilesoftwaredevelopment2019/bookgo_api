//Post.js

const mongoose = require('mongoose');

//schema
var PostSchema = mongoose.Schema({
	writer:{type:String, required:[true, "Writer Name is required!"]},
	title:{type:String, required:[true, "Title is required!"]},
	body:{type:String},
	password:{type:String, required:[true, "password is required!"]}
});

//model&export
var Post = mongoose.model("post", PostSchema);
module.exports = Post;