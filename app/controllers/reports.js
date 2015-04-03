var fs = require('fs')
	, hbs = require('hbs')
	, moment = require('moment')
	, Report = require('../models/report')
	, Account = require('../models/account')

reportController = {
	list: function(req, res, next) {
		Report
			.find()
			.sort('-timestamp')
			.populate('belongsTo')
			.exec(function(err, reports) {
				// res.json(reports)
				res.render('reports/all', {
					reports: reports
				})
			})
	}

	, post: function(req, res, next) {
		var correspondantId = req.body.correspondantId || req.body.correspondentIdPicker

		var report = new Report({
			status: req.body.status
			, inputSource: 'manual'
			, timestamp: req.body.time
			, hasBeenViewed: true
			, belongsTo: correspondantId
			, location: {
				type: 'town'
				, content: 'req.body.location'
			// 	// , coordinates: String
			}
			// , message: req.body.message
		})
		if (req.body.message) report.message = req.body.message

		report.save(function(err, report) {
			if (err)
				res.send(err)
			res.redirect('/correspondents/'+correspondantId)
			// res.redirect('/reports/'+report._id)
			// res.json([{saved:report}, {src:req.body}])
			Account.findById(correspondantId, function(err, account) {
				account.lastUpdate = report.timestamp
                account.reports.push(report)
                account.save()
            })
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
