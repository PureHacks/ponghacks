"use strict";

var router = require("express").Router();

var mockUsers = require("../../../mockData/users.js");

var getUsers = function(req, res) {
	if (req.error){
		console.warn(req.error);
	}
	else {
		res.status(200).send(mockUsers);
	}
};
router.get("/", getUsers);

module.exports = router;