//Relation.js

const mongoose = require('mongoose');

//schema
var RelationSchema = mongoose.Schema({
	idname:{type:String, required:true},
	eid:{type:Number, required:true}
});

//model&export
var User = mongoose.model("ScheduleUser", UserSchema);
module.exports = User;