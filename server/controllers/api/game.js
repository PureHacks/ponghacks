"use strict";

module.exports = function(io) {

	var router = require("express").Router();
	var gameService = require("../../services/gameService");
	var hipchatService = require("../../services/hipchatService");


	var addGame = function(req, res) {
		req.checkBody("winnerUserId", "Invalid or missing winnerUserId").notEmpty().isInt();
		req.checkBody("winnerScore", "Invalid or missing winnerScore").notEmpty().isInt();
		req.checkBody("loserUserId", "Invalid or missing loserUserId").notEmpty().isInt();
		req.checkBody("loserScore", "Invalid or missing loserScore").notEmpty().isInt();

		var validationErrors = req.validationErrors();
		if (validationErrors) {
			res.status(400).json(validationErrors);
		    return;
		}

		gameService.addGame(req.body, function(error, insertId){
			if (error){
				res.status(500).json({"error": "Error adding game."});
			}
			else {
				gameService.getGame(insertId, function(error, results) {
					if (results.length > 0) {
						io.emit("new-game", results[0]);
					}
				});

				hipchatService.gameUpdate(req.body.winnerUserId, req.body.loserUserId, req.body.winnerScore, req.body.loserScore);

				res.status(200).json({id: insertId});
			}
		});
	};

	var getGame = function(req, res) {
		gameService.getGame(req.params.gameId, function(error, rows) {
			if (error) {
				res.status(500).json({"error": "Error getting game."});
			}
			else if (rows.length === 0) {
		  		res.status(404).json({"error": "Game with id " + req.params.gameId + " not found."});
		  	}
			else {
				res.status(200).json(rows[0]);
			}
		});
	};

	var getUserGames = function(req, res) {
		var numResults = parseInt(req.query.numResults) || 25;
		var offset = parseInt(req.query.offset) || 0;

		gameService.getUserGames(req.params.userId, numResults, offset, function(error, result) {
			if (error){
				res.status(500).json({"error": "Error getting users games."});
			}
			else {
				res.status(200).json(result);
			}
		});
	};

	var getGames = function(req, res) {
		var numGames = parseInt(req.params.numGames) || 5;

		gameService.getGames(numGames, function(error, result){
			if (error) {
				res.status(500).json({"error": "Error getting recent games."});
			}
			else {
				res.status(200).json(result);
			}
		});
	};

	var getVersusGames = function(req, res) {
		var numResults = parseInt(req.query.numResults) || 25;
		var offset = parseInt(req.query.offset) || 0;

		gameService.getVersusGames(req.params.userId, req.params.opponentUserId, numResults, offset, function(error, result) {
			if (error){
				res.status(500).json({"error": "Error getting versus games."});
			}
			else {
				res.status(200).json(result);
			}
		});
	};

	var getTotalNumGames = function(req, res) {
		gameService.getTotalNumGames(function(error, rows) {
			if (error || rows.length === 0){
				res.status(500).json({"error": "Error getting game count."});
			}
			else {
				res.status(200).json(rows[0]);
			}
		});
	};


	router.post("/", addGame);
	router.get("/total", getTotalNumGames);
	router.get("/:gameId", getGame);
	router.get("/:userId/versus/:opponentUserId", getVersusGames);
	router.get("/user/:userId", getUserGames);
	router.get("/history/:numGames", getGames);

	return router;
};