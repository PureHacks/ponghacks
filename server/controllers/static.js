'use strict';
var router = require("express").Router();

router.get("/", function (req, res) {
	if (req.err){
		console.warn(err.message);
	}
	else {
		// public/views/public.html
		res.status(200).render('index.html');
	}
})

module.exports = router;