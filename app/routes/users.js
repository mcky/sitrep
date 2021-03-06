var express = require('express')
	, router = express.Router()
	, passport = require('passport')
	, Account = require('../models/account')

login = {
	get: function(req, res) {
		if (req.isAuthenticated()) {
			req.logout()
			res.redirect('/login')
		} else {
			res.render('login')
		}
	}
	, post: function(req, res) {
		var next = req.body.next || '/'
		res.redirect(next)
	}
}

logout = function(req, res) {
	req.logout()
	res.redirect('/login')
}


register = {
	get: function(req, res) {
		res.render('register')
	}
	, post: function(req, res, next) {
		var email = req.body.username
		if (!email || email == '') {
			email = 'email'+ Date.now() +'@google.com'
		}
		Account.register(new Account({ email: email}), req.body.password, function(err) {
			if (err) {
				console.log('error while user register!', err)
				return next(err)
			}

			console.log('user registered!')

			passport.authenticate('local')(req, res, function () {
				var next = req.body.next || '/'
				res.redirect(next)
			})
		})
	}
}

account = {
	get: function(req, res) {
		res.render('account/index')
	}
	, post: function(req, res) {
		Account.findByIdAndUpdate(req.user._id, {
			// Logs you out if you change email?
			email: req.body.userEmail
			, name: req.body.name
			, isEditor: true
			, isCorrespondent: false
			, phoneNumber: req.body.phoneNumber
		},function(){
			res.redirect('/account')
		})
	}
	, delete: function(req, res) {
		req.user.authenticate(req.body.password, function(err, thisModel, passwordErr) {
			if (err || passwordErr) {
				// Flash/error
				res.redirect('/account')
			} else {
				Account.findById(req.user._id).remove().exec()
				res.redirect('/')
			}
		})
	}
}

// router.get('/login', login.get)
router.post('/login', passport.authenticate('local'), login.post)

// router.get('/logout', logout)
router.post('/logout', logout)

// router.get('/register', register.get)
router.post('/register', register.post)

router.get('/account', account.get)
router.post('/account', account.post)
router.delete('/account', account.delete)

module.exports = router
