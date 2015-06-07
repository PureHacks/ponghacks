"use strict";

var router = require("express").Router();
var statsService = require("../../services/statsService");

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

var getWeeklyStandings = function(req, res) {
	var numResults = parseInt(req.query.numResults) || 5;

	statsService.getWeeklyStandings(numResults, function(error, rows){
		if (error){
			res.status(500).json({"error": "Error fetching weekly standings."});
		}
	  	else {
	  		res.status(200).json(rows);
	  	}
	});
};

var getLongestWinStreak = function(req, res) {
	statsService.getLongestWinStreak(function(error, rows){
		if (error || rows.length === 0){
			res.status(500).json({"error": "Error getting longest winning streak."});
		}
	  	else {
	  		res.status(200).json(rows[0]);
	  	}
	});
};

var getLongestLosingStreak = function(req, res) {
	statsService.getLongestLosingStreak(function(error, rows){
		if (error || rows.length === 0){
			res.status(500).json({"error": "Error getting longest losing streak."});
		}
	  	else {
	  		res.status(200).json(rows[0]);
	  	}
	});
};

var getLargestScoreDifference = function(req, res) {
	statsService.getLargestScoreDifference(function(error, rows){
		if (error || rows.length === 0){
			res.status(500).json({"error": "Error getting largest score difference."});
		}
	  	else {
	  		res.status(200).json(rows[0]);
	  	}
	});
};

var getTopRankings = function(req, res) {
	var numResults = parseInt(req.query.numResults) || 5;

	statsService.getTopRankings(numResults, function(error, rows){
		if (error || rows.length === 0){
			res.status(500).json({"error": "Error getting top rankings."});
		}
	  	else {
	  		res.status(200).json(rows);
	  	}
	});
};

router.get("/app", getAppStats);
router.get("/user/:userId", getUserStats);
router.get("/user/:userId/matchup/:opponentUserId", getUserMatchup);
router.get("/standings/weekly", getWeeklyStandings);
router.get("/streak/wins/top", getLongestWinStreak);
router.get("/streak/losses/top", getLongestLosingStreak);
router.get("/largest-score-difference", getLargestScoreDifference);
router.get("/top-rankings", getTopRankings);

module.exports = router;