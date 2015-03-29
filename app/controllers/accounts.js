var express = require('express')
	, Account = require('../models/account')

accountController = {
	list: function(req, res, next) {
	}

	,newCorrespondent: function(req, res, next) {
		var email = req.body.username
		if (!email || email == '') {
			email = 'email'+ Date.now() +'@google.com'
		}
		Account.register(new Account({
			email: email
			, name: req.body.name
			, isCorrespondent: true
			, phoneNumber: req.body.phoneNumber
		}), 'password', function(err, correspondent) {
			if (err) {
				console.log('error while user register!', err)
				return next(err)
			}
			// res.json(correspondent)
			res.redirect('/correspondents/'+correspondent._id)
		})
	}
}

module.exports = accountController
