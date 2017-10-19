//Relation.js

const mongoose = require('mongoose');

//schema
var RelationSchema = mongoose.Schema({
	uid:{type:Number, required:true},
	eid:{type:Number, required:true}
});

//model&export
var Relation = mongoose.model("Relations", RelationSchema);
module.exports = Relation;