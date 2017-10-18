//Relation.js

const mongoose = require('mongoose');

//schema
var RelationSchema = mongoose.Schema({
	idname:{type:String, required:true},
	eid:{type:Number, required:true}
});

//model&export
var Relation = mongoose.model("Relations", RelationSchema);
module.exports = Relation;