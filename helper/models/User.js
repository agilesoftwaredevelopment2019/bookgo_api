//User.js

const mongoose = require('mongoose');

//schema
var UserSchema = mongoose.Schema({
	uid:{type:Number, required:[true, "id is required!"], unique:true},
	idname:{type:String, required:[true, "id is required!"]},
	password:{type:String, required:[true, "password is required!"]},
	nickname:{type:String, required:[true, "nickname is required!"]}
});

//model&export
var User = mongoose.model("ScheduleUser", UserSchema);
module.exports = User;