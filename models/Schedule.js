//Post.js

const mongoose = require('mongoose');

//schema
var ScheduleSchema = mongoose.Schema({
	eid:{type:Number, required:true, unique:true},
	date:{type:String},
	title:{type:String, required:[true, "Title is required!"]},
	sort:{type:String}
});

//model&export
var Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;