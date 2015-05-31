var router = require("express").Router();

var inputScore = function(req, res) {
	console.log("INPUT SCORE:");
	var winner = req.body.winner,
		loser = req.body.loser;

	console.log("winner:", winner);
	console.log("loser:", loser);

	res.sendStatus(200);
	
};


router.post("/", inputScore);

module.exports = router;