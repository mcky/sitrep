var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, passportLocalMongoose = require('passport-local-mongoose')

var Account = new Schema({
	name: String
	, isEditor: Boolean
	, isCorrespondent: Boolean
	, phoneNumber: String
	, dateRegistered: Date
	, lastUpdate: Date
	// , correspondents: [{
		// ObjectID
	// }]
	, reports : [{ type: Schema.ObjectId, ref: 'Report' }]
})

Account.plugin(passportLocalMongoose,{
	usernameField: 'email'
	, usernameLowerCase: true
})

module.exports = mongoose.model('Account', Account)
