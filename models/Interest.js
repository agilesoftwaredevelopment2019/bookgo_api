//User.js

const mongoose = require('mongoose');

//schema
var InterestSchema = mongoose.Schema({
	uid:{type:Number, required:[true, "id is required!"], unique:true},
	user_id:{type:Number, required:[true]},
	product_id:{type:Number, required:[true]}
});

//model&export
var Interest = mongoose.model("Interest", InterestSchema);
module.exports = Interest;