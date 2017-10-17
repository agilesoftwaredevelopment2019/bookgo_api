//User.js

const mongoose = require('mongoose');

//schema
var UserSchema = mongoose.Schema({
	idname:{type:String, required:true, unique:true},
	password:{type:String, required:true},
	nickname:{type:String, required:true}
});

//model&export
var User = mongoose.model("ScheduleUser", UserSchema);
module.exports = User;