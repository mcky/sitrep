var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, passportLocalMongoose = require('passport-local-mongoose')

var Report = new Schema({
	status: String
	, inputSource: String
	, belongsTo: String
	, timestamp: Date
	, hasBeenViewed: Boolean
	, sentFrom: String // Phone #
	, location: {
		type: String
		, content: String
		, coordinates: String
	}
	, message: String
	, source: [{
		text: String
	}]
})

module.exports = mongoose.model('Report', Report)
