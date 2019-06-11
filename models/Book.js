//Book.js

const mongoose = require('mongoose');

//schema
var BookSchema = mongoose.Schema({
	uid:{type:Number, required:true, unique:true},
	title:{type:String, required:[true, "Title is required!"]},
	author:{type:String, required:false},
	publisher:{type:String, required:false}
});

//model&export
var Book = mongoose.model("Book", BookSchema);
module.exports = Book;