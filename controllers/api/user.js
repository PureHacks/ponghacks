var router = require("express").Router();
var userService = require('../../services/userService');
var requestUtil = require('../../utils/requestUtil');

var getAllUsers = function(req, res) {
	userService.getAllUsers(function(error, users){
		requestUtil.jsonResponse(req, res, users);
	});
};

var getUser = function(req, res) {
	userService.getUser(req.params.userId, function(error, user){
		requestUtil.jsonResponse(req, res, user);
	});
};

router.get("/list", getAllUsers);
router.get("/:userId", getUser);

module.exports = router;