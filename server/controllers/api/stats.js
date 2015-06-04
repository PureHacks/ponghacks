var router = require("express").Router();
var statsService = require('../../services/statsService');

var getAppStats = function(req, res) {
	statsService.getAppStats(function(error, rows){
		if (error){
			res.status(500).json({"error": "Error fetching app stats."});
		}
	  	else {
	  		res.status(200).json(rows[0]);
	  	}
	});
};

var getUserStats = function(req, res) {
	statsService.getUserStats(req.params.userId, function(error, rows){
		if (error){
			res.status(500).json({"error": "Error fetching user stats."});
		}
	  	else {
	  		res.status(200).json(rows[0]);
	  	}
	});
};

var getUserMatchup = function(req, res) {
	statsService.getUserMatchup(req.params.userId, req.params.opponentUserId, function(error, rows){
		if (error){
			res.status(500).json({"error": "Error fetching matchup."});
		}
	  	else {
	  		res.status(200).json(rows[0]);
	  	}
	});
};

router.get("/app", getAppStats);
router.get("/user/:userId", getUserStats);
router.get("/user/:userId/matchup/:opponentUserId", getUserMatchup);

module.exports = router;