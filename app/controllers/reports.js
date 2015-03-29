var fs = require('fs')
	, hbs = require('hbs')
	, moment = require('moment')
	, Report = require('../models/report')

reportController = {
	list: function(req, res, next) {
		Report.find(function(err, reports) {
			if (err)
				res.send(err)
			res.json(reports)
		})
	}

	, post: function(req, res, next) {
		var report = new Report({
			status: req.body.status
			, timestamp: req.body.time
			, hasBeenViewed: false
			, sentFrom: req.body.phone
			, location: {
				type: 'string'
				, content: req.body.location
				// , coordinates: String
			}
			, message: req.body.message
		})

		if (req.body.message) report.message = req.body.message

		report.save(function(err, report) {
			if (err)
				res.send(err)
			res.redirect('/')
			// res.json(report)
		})
	}

	, get: function(req, res, next) {
		Report.findById(req.params.report_id, function(err, report) {
			if (err)
				res.send(err)
			res.json(report)
		})
	}

	, put: function(req, res, next) {
		Report.findById(req.params.report_id, function(err, report) {
			if (err)
				res.send(err)

			report.name = req.body.name  // update the reports info
			report.stakeholders = req.body.stakeholders  // update the reports info

			// save the report
			report.save(function(err) {
				if (err)
					res.send(err)

				res.json({ message: 'Report updated!' })
			})
		})
	}

	, delete: function(req, res, next) {
		Report.remove({
			_id: req.params.report_id
		}, function(err, report) {
			if (err)
				res.send(err)

			res.json({ message: 'Successfully deleted' })
		})
	}
}

module.exports = reportController
