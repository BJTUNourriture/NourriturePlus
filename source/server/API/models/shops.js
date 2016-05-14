// API/models/groups.js

var mongoose = require('mongoose');

var shopsSchema = new mongoose.Schema({
	title : {
		type : String,
		required : true
	},
	description : {
    type: String
  },
  lat : {
    type : Number,
    required: true
  },
  lng : {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Shops', shopsSchema);
