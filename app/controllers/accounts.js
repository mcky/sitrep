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
			, name: 'Joe smith'
			, isCorrespondent: true
			, phoneNumber: '07805284648'
		}), 'password', function(err) {
			if (err) {
				console.log('error while user register!', err)
				return next(err)
			}
		})
	}
}

module.exports = accountController
