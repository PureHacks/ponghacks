"use strict";

var router = require("express").Router();

var handleRequest = function(req, res) {
	if (req.error) {
		console.warn(req.error);
	} else {
		res.status(200).render("index.html");
	}
};

router.get("/", handleRequest);
router.get("/dashboard", handleRequest);
router.get("/tv", handleRequest);
router.get("/game-history", handleRequest);
router.get("/player-stats", handleRequest);
router.get("/input-score", handleRequest);
router.get("/user/:id", handleRequest);

module.exports = router;