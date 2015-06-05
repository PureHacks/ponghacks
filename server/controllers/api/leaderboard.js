"use strict";

var router = require("express").Router();

var getLeaderboard = function(req, res) {
	if (req.error){
		console.warn(req.error);
	}
	else {
		// layouts/public.html
		res.status(200).send("No Leaders yet");
	}
};
router.get("/", getLeaderboard);

module.exports = router;