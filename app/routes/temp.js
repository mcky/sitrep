var express = require('express')
	, async = require('async')
	, router = express.Router()
	, passport = require('passport')
	, Account = require('../models/account')
	, Report = require('../models/report')
	, accountController = require('../controllers/accounts')
	, twilio = require('twilio');

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
		.sort('-timestamp')
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
		.sort('-lastUpdate')
		// .populate('reports')
		.populate({path: 'reports', options: { sort: '-timestamp' }})
		.exec(function(err, correspondents, count) {
			// res.json(correspondents)
			res.render('correspondents/all', {
				correspondents: correspondents
			})
		})
	})

router.route('/correspondents/new')
	.get(function(req, res) {
		res.render('correspondents/new', {
			// correspondents: correspondents
		})
	})
	.post(accountController.newCorrespondent)

router.route('/correspondents/:id/report')
	.get(function(req, res) {
		Account
			.findById(req.params.id)
			.select('-hash -salt')
			.exec(function(err, correspondent, count) {
				res.render('reports/new', {
					correspondent: correspondent
				})
			})
	})

router.route('/correspondents/:id')
	.get(function(req, res) {
		async.waterfall([
			function(callback){
				Account
					.findById(req.params.id)
					.select('-hash -salt')
					.exec(function(err, correspondent, count) {
						callback(null, correspondent)
					})
			}
			,function(correspondent, callback){
				Report
					.find({belongsTo: correspondent._id})
					.select('-hash -salt')
					.sort('-timestamp')
					.exec(function(err, correspondent2, count) {
						callback(null, correspondent, correspondent2)
					})
			}
		], function (err, result, res2) {
			// res.json([result, res2])
			res.render('correspondents/single', {
				correspondent: result
				, reports: res2
			})

		});
		// ], function(err, results){
		// 	// var correspondent = results[0]
		// 	// var reports = results[1]
		// 	res.json(results)
		// 	// res.render('correspondents/single', {
		// 	// 	correspondent: correspondent
		// 	// 	, reports: reports
		// 	// 	// , reports: [{str:'one'},{str:'two'}]
		// 	// })
		// })
	})
	// .delete

router.route('/twilio')
	.all(function(req, res) {
		var q = req.param('q') || req.body.Body
			, status = 'red'
			, sentFrom = req.body.From || '0'
		// var sentFrom = req.param('f') || req.body.From

		console.log('sms::'+JSON.stringify(req.body)+'::')
		console.log('search::'+q+'::')

		var red = ['r','red','RED','Red','Danger']
		var amber = ['a','amber','AMBER','Amber','Warning']
		var green = ['g','green','GREEN','Green','Safe']

		if (~red.indexOf(q)) {
			status = 'red'
		} else if (~red.indexOf(q)) {
			status = 'amber'
		} else if (~red.indexOf(q)) {
			status = 'green'
		}

			var report = new Report({
			status: status
			, inputSource: 'sms'
			, timestamp: Date.now()
			, hasBeenViewed: false
			, sentFrom: sentFrom
			, belongsTo: '5517f9f3700340030082a2d5'
			// , belongsTo: correspondantId
			// , message: req.body.message
		})

		report.save(function(err, report) {})
		console.log(status)
		res.json(status)
	})
module.exports = router
