var express = require('express')
	, router = express.Router()
	, Account = require('../models/account')
	, reportController = require('../controllers/reports')

router.route('/reports')
	.get(reportController.list)
	.post(reportController.post)

router.route('/reports/new')
	.get(function(req, res) {
		Account
		.find({isCorrespondent: true})
		.select('-hash -salt')
		.exec(function(err, correspondents, count) {
			// res.json(correspondents)
			res.render('reports/new', {
				blob: correspondents
			})
		})
	})
	.post(reportController.post)

module.exports = router
