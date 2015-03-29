var express = require('express')
	, router = express.Router()
	, reportController = require('../controllers/reports')

router.route('/reports')
	.get(reportController.list)
	.post(reportController.post)

router.route('/reports/new')
	.get(function(req, res) {
		res.render('reports/new')
	})
	.post(reportController.post)

module.exports = router
