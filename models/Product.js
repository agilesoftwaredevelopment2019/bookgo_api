//User.js

const mongoose = require('mongoose');

//schema
var ProductSchema = mongoose.Schema({
	uid:{type:Number, required:[true, "id is required!"], unique:true},
	book_id:{type:Number, required:[true]},
	seller_id:{type:Number, required:[true]},
	price:{type:Number, required:[true]},
	onSale:{type:Boolean, required:[true]},
	description:{type:String, required:[false]}
});

//model&export
var Product = mongoose.model("Product", ProductSchema);
module.exports = Product;