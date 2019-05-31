//User.js

const mongoose = require('mongoose');

//schema
var UserSchema = mongoose.Schema({
	uid:{type:Number, required:[true, "id is required!"], unique:true},
	idname:{type:String, required:[true, "idname is required!"], unique:true},
	password:{type:String, required:[true, "password is required!"]},
	nickname:{type:String, required:[true, "nickname is required!"]},
	name:{type:String, required:[true, "name is required!"]},
	phonenumber:{type:String, required:[true, "phonenumber is required!"]},
	isAuthenticated:{type:Boolean}
});

//model&export
var User = mongoose.model("User", UserSchema);
module.exports = User;