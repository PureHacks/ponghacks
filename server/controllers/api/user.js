"use strict";

var router = require("express").Router();
var userService = require("../../services/userService");

var getAllUsers = function(req, res) {
	userService.getAllUsers(function(error, users){
		if (error){
			res.status(500).json({"error": "Error fetching users."});
		}
		else {
			res.status(200).json(users);
		}
	});
};

var getUser = function(req, res) {
	userService.getUser(req.params.userId, function(error, rows){
		if (error){
			res.status(500).json({"error": "Error fetching user."});
		}
		else if (rows.length === 0){
	  		res.status(404).json({"error": "User with id " + req.params.userId + " not found."});
	  	}
	  	else {
	  		res.status(200).json(rows[0]);
	  	}
	});
};

router.get("/list", getAllUsers);
router.get("/:userId", getUser);

module.exports = router;