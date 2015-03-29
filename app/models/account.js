var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, passportLocalMongoose = require('passport-local-mongoose')

var Account = new Schema({
	name: String
	, isEditor: Boolean
	, isCorrespondent: Boolean
	, phoneNumber: String
	, dateRegistered: Date
	// , correspondents: [{
		// ObjectID
	// }]
})

Account.plugin(passportLocalMongoose,{
	usernameField: 'email'
	, usernameLowerCase: true
})

module.exports = mongoose.model('Account', Account)
