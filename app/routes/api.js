var express = require('express')
	, url = require('url')
	, router = express.Router()
	, projectController = require('../controllers/projects')
	// , userController = require('../controllers/users')

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' })
})

// router.route('/users')
// 	.get(userController.list)
// 	.post(userController.post)

// router.route('/users/:user_id')
// 	.get(userController.get)
// 	.put(userController.put)
// 	.delete(userController.delete)

router.route('/projects')
	.get(projectController.list)
	.post(projectController.post)

router.route('/projects/:project_id')
	.get(projectController.get)
	.put(projectController.put)
	.delete(projectController.delete)

module.exports = router
