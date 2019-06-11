//User.js

const mongoose = require('mongoose');

//schema
var TransactionSchema = mongoose.Schema({
	uid:{type:Number, required:[true, "id is required!"], unique:true},
	product_id:{type:Number, required:[true]},
	buyer_id:{type:Number, required:[true]},
	seller_id:{type:Number, required:[true]},
	price:{type:Number, required:[true]},
	message:{type:String, required:true},
	phonenumber:{type:Number, required:true}
});

//model&export
var Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;