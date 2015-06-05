"use strict";

var router = require("express").Router();

router.get("/", function (req, res) {
	if (req.error){
		console.warn(req.error);
	}
	else {
		// public/views/index.html
		res.status(200).render("index.html");
	}
});

module.exports = router;