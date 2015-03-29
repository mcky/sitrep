var express = require('express')
	, router = express.Router()
	, passport = require('passport')
	, Account = require('../models/account')
	, Report = require('../models/report')
	, accountController = require('../controllers/accounts')

router.get('/', function(req, res) {
	res.render('home')
})

router.get('/dev/clear/accs', function(req, res) {
	Account.find({}).remove().exec()
	res.redirect('/')
})

router.get('/dev/clear/reports', function(req, res) {
	Report.find({}).remove().exec()
	res.redirect('/')
})

router.get('/dev/list/reports', function(req, res) {
	Report
		.find({})
		.exec(function(err, reports, count) {
			res.json(reports)
		})
})

router.get('/dev/list/accounts', function(req, res) {
	Account
		.find({})
		.select('-hash -salt')
		.exec(function(err, accounts, count) {
			res.json(accounts)
		})
})

router.get('/dev/new/account/:type', function(req, res, next) {
	var isEditor = false
		, isCorrespondent = false
	if (req.params.type === 'e') isEditor = true
	if (req.params.type === 'c') isEditor = true
	Account.register(new Account({
			email: req.query.email || 'name4343@gmail.com'
			, isEditor: isEditor
			, isCorrespondent: isCorrespondent
			, phoneNumber: req.query.phoneNumber || '07401234567'
			, dateRegistered: Date.now()
		}), 'password', function(err) {
		if (err) {
			console.log('error while user register!', err)
			return next(err)
		}

		console.log('user registered!')

		passport.authenticate('local')(req, res, function () {
			res.redirect('/')
		})
	})
})

router.get('/dev/new/report', function(req, res) {
	// var dateStr = new Date().toISOString().slice(11, -5)
	new Report({
	// 	isHosted : true
	// 	, title: 'Dummy post at '+ dateStr
	// 	, datePublished: Date.now()
	// 	, dateCreated: Date.now()
	// 	, dateEdited: Date.now()
	// 	, content: [{text:'abc'}]
	}).save( function( err, report, count ){
	// 	res.redirect('/')
	})
})

router.route('/correspondents')
	.get(function(req, res) {
		Account
		.find({isCorrespondent: true})
		.select('-hash -salt')
		.exec(function(err, correspondents, count) {
			// res.json(correspondents)
			res.render('correspondents/all', {
				correspondents: correspondents
			})
		})
	})

router.route('/correspondents/new')
	.get(function(req, res) {
		res.render('correspondents/new')
	})
	.post(accountController.newCorrespondent)

router.route('/correspondents/:id')
	.get(function(req, res) {
		Account
		.findById(req.params.id)
		.select('-hash -salt')
		.exec(function(err, correspondent, count) {
			// res.json(correspondents)
			res.render('correspondents/single', {
				correspondent: correspondent
			})
		})
	})

module.exports = router
