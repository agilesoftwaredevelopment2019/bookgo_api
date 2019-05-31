//Book.js

const mongoose = require('mongoose');

//schema
var BookSchema = mongoose.Schema({
	uid:{type:Number, required:true, unique:true},
	date:{type:String},
	title:{type:String, required:[true, "Title is required!"]},
	price:{type:Number, required:true},
	hashtag:{type:String, required:[false]}
});

//model&export
var Book = mongoose.model("Book", BookSchema);
module.exports = Book;